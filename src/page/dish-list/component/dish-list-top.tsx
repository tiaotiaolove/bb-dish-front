import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Tabs  } from 'antd-mobile';

const tabStatus = [
  { title: '全部', tabKey: null },
  { title: '春季', tabKey: 0 },
  { title: '夏季', tabKey: 1 },
  { title: '秋季', tabKey: 2 },
  { title: '冬季', tabKey: 3 }
];

@inject('dishListStore')
@observer
export default class DishListTop extends Component<any, any> {

  render() {
    const { season, changeSeason } = this.props.dishListStore;

    return (
      <Tabs tabs={tabStatus}
            initialPage={season ? season+1 : 0}
            onChange={(tab) => { changeSeason(tab.tabKey); }}
      />
    );
  }
}
