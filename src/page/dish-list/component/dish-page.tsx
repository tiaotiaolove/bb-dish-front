import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { DishListStore } from "../store";
import MyListView from "../../../util-biz/list-view";
import constant from "../../../util/common/constant";

interface IDishListProps {
  dishListStore?: DishListStore | any;
}

@inject('dishListStore')
@observer
export default class DishPage extends Component<IDishListProps, any> {

  render() {
    return (
      <MyListView
        renderRow={this._renderRow}
        url={`${constant.HOST}/dish/page`}
        urlParams={{
          season: this.props.dishListStore.season
        }}
        pageSize={3}
      />
    );
  }

  /**
   * 行渲染
   * @param rowData
   * @private
   */
  _renderRow = (rowData: any) => {
    return (
      <div key={rowData.dishId} style={{ padding: '0 15px' }}>
        <div
          style={{
            lineHeight: '50px',
            color: '#888',
            fontSize: 18,
            borderBottom: '1px solid #F6F6F6',
          }}
        >{rowData.dishName}</div>
        <div style={{ display: 'flex', padding: '15px 0' }}>
          <img style={{ height: '64px', marginRight: '15px' }} src={rowData.dishPic} alt="" />
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.dishDesc}</div>
            <div><span style={{ fontSize: '16px', color: '#FF6E27' }}>热度:{rowData.hotGrade}</span></div>
          </div>
        </div>
      </div>
    );
  };
}
