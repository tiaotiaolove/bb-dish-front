import React, { Component, ReactText } from 'react';
import { ListView, PullToRefresh } from "antd-mobile";
import { axiosFetch, handleResp } from "../../util/common/http";
import DataLoading from "../loading-data";

export interface IMyListViewProps{
  // 渲染行的方法
  renderRow: (rowData: any, sectionID: string | number, rowID: string | number, highlightRow?: boolean) => React.ReactElement<any>;

  /**
   * 传入url,分页列表数据完全由MyListView内部处理
   */
  // 分页请求的url
  url?: string;
  // 分页请求的请求类型
  method?: 'GET' | 'POST';
  // 分页请求的json参数
  urlParams?: any;
  // 分页大小
  pageSize?: number;

  /**
   * 传入dataResource,分页列表数据完全由父组件传入
   */
  // 数据列表
  dataResource?: DataListResult;
  // 提供下一页数据列表的回调方法(父组件传入)
  onEndReached?: () => DataListResult;
  // 上拉刷新场景时,提供第一页数据列表的回调方法(父组件传入)
  onRefresh?: () => DataListResult;
}

export interface DataListResult {
  list: Array<any>;
  hasNextPage: boolean;
}

/**
 * 分页ListView工具, 利用antd-mobile的ListView, 内置不常变化的属性与状态处理下一页以及上拉刷新等逻辑
 */
export default class MyListView extends Component<IMyListViewProps, any> {
  pageNum: number = 1;

  static defaultProps = {
    method: 'POST',
    urlParams: {},
    pageSize: 10,
  };

  constructor(props: IMyListViewProps) {
    super(props);

    // 初始化state
    const innerDataListTmp = props.dataResource ? (props.dataResource.list || []) : [];
    this.state = {
      innerDataList: innerDataListTmp,
      // ListView的数据源
      dataSource: new ListView.DataSource({rowHasChanged: (row1: any, row2: any) => row1 !== row2}).cloneWithRows(innerDataListTmp),
      // 是否正在加载第一个分页数据
      loadingFirstPage: false,
      // 是否正在加载下一页数据
      loadingNextPage: false,
      // 是否还有下一个分页数据
      hasNextPage: true,
      // 是否正在上拉刷新
      refreshing: false,
    };
  }

  async componentDidMount() {
    await this._onInitRefresh();
  }

  /**
   * 替代的componentWillReceiveProps生命周期方法的思路之一(render之后)
   * @param prevProps render之前的props
   * @param prevState render之前的state
   */
  async componentDidUpdate(prevProps: Readonly<IMyListViewProps>, prevState: Readonly<any>) {
    if(this.props.url && (
      prevProps.url !== this.props.url
      || prevProps.urlParams !== this.props.urlParams
      || prevProps.pageSize !== this.props.pageSize
    )) {
      // 若请求地址,请求参数变化时, 刷新页面重新请求第一页数据
      await this._onInitRefresh();
    } else if (this.props.dataResource && prevProps.dataResource &&
      this.props.dataResource.list !== prevProps.dataResource.list
    ) {
      // 若父组件传入的新dataResource.list 与 之前的旧dataResource.list 不一致时
      this._setDataListState(this.props.dataResource, false);
    }
  }

  render() {
    const { loadingFirstPage, dataSource } = this.state;
    const { renderRow } = this.props;
    if (loadingFirstPage) {
      return <DataLoading key={'loadingPage'}/>;
    } else {
      return (<ListView
        key={'listView'}
        dataSource={dataSource}
        renderRow={renderRow}
        renderFooter={this._renderFooter}
        renderSeparator={this._renderSeparator}
        useBodyScroll
        onEndReached={this._onEndReached}
        onEndReachedThreshold={10}
        pullToRefresh={this._pullToRefresh()}
      />);
    }
  }

  /**
   * 滚动条到底部时,触发获取下一页数据
   * @private
   */
  _onEndReached = async () => {
    const { loadingFirstPage, loadingNextPage, hasNextPage, refreshing } = this.state;
    // 有下一页  且 上次的下一页已加载完毕 且 上拉刷新已经结束 且 第一页已加载完毕, 才可以查询下一页数据(即没有任何数据请求时,才可操作)
    if (hasNextPage && !loadingNextPage && !refreshing && !loadingFirstPage) {
      this.setState({ loadingNextPage: true });
      // 判断从什么地方获取dataSource
      if (this.props.url) {
        this.pageNum++;
        await this._getDataFromUrl(true);
      } else if (this.props.onEndReached) {
        this.props.onEndReached();
      }
    }
  };

  /**
   * 初始化刷新,加载第一页数据(区别于上拉刷新)
   * 场景: 1.第一次进入分页列表时 2.切换的查询条件时
   * @private
   */
  _onInitRefresh = async () => {
    await this._refresh({ loadingFirstPage: true });
  };

  /**
   * 上拉刷新,重新加载第一页数据
   * @private
   */
  _onPullRefresh = async () => {
    await this._refresh({ refreshing: true });
  };

  /**
   * 刷新,重新请求第一页数据
   * 以供各种场景的重新请求
   * @private
   */
  _refresh = async (resetState: any) => {
    const { loadingFirstPage, loadingNextPage, refreshing } = this.state;
    // 上次的下一页已加载完毕 且 上拉刷新已经结束 且 第一页已加载完毕, 才可以上拉刷新(即没有任何数据请求时,才可操作)
    if (!loadingNextPage && !refreshing && !loadingFirstPage) {
      this.setState(resetState);
      // 判断从什么地方获取dataSource
      if (this.props.url) {
        this.pageNum = 1;
        await this._getDataFromUrl(false);
      } else if (this.props.onRefresh) {
        this.props.onRefresh();
      }
    }
  };

  /**
   * 通过Url获取分页的dataList
   * @param concatFlag 是否拼接dataList(true:获取下一页数据场景; false:上拉获取第一页数据场景)
   * @private
   */
  _getDataFromUrl = async (concatFlag:boolean = true) => {
    if (this.props.url) {
      const dishListRes = await axiosFetch(this.props.url, {
        method: this.props.method,
        data: {
          pageNum: this.pageNum,
          pageSize: this.props.pageSize,
          ...this.props.urlParams
        },
      });
      if (handleResp(dishListRes)) {
        this._setDataListState(dishListRes.context, concatFlag);
      }
    }
  };

  /**
   * 设置dataSource, loadingFirstPage, loadingNextPage, refreshing, hasNextPage等state
   * @param dataListRes
   * @param concatFlag 是否拼接dataList(true:获取下一页数据场景; false:上拉获取第一页数据场景)
   * @private
   */
  _setDataListState = (dataListRes:DataListResult, concatFlag:boolean = true) => {
    const innerDataListTmp = concatFlag ? this.state.innerDataList.concat(dataListRes.list) : dataListRes.list;
    this.setState({
      innerDataList: innerDataListTmp,
      dataSource: this.state.dataSource.cloneWithRows(innerDataListTmp),
      loadingFirstPage: false,
      loadingNextPage: false,
      hasNextPage: dataListRes.hasNextPage,
      refreshing: false,
    });
  };

  /**
   * 渲染底部,主要用于展示下一页数据是否正在loading
   * @private
   */
  _renderFooter = () => {
    let footText = null;

    const { loadingNextPage, hasNextPage } = this.state;
    if (loadingNextPage && hasNextPage) {
      footText = <img src={require('../loading/img/loading.svg')} alt={"footerLoading"} width='50px' height='auto'/>;
    } else if (hasNextPage) {
      footText = <p style={{ padding: 10 }}>下拉加载更多</p>;
    } else if (!hasNextPage) {
      footText = <p style={{ padding: 10 }}>没有更多了</p>;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        {footText}
      </div>
    );
  };

  /**
   * 行分隔区域
   * @private
   */
  _renderSeparator = (sectionID: ReactText, rowID: ReactText) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        borderBottom: '1px solid #ECECED',
      }}
    />
  );

  /**
   * 上拉刷新组件
   * @private
   */
  _pullToRefresh = () => {
    return (<PullToRefresh
      getScrollContainer={() => document.body}
      direction="down"
      distanceToRefresh={30}
      onRefresh={this._onPullRefresh}
      indicator={{}}
      damping={100}
      refreshing={this.state.refreshing}
    />);
  }
}
