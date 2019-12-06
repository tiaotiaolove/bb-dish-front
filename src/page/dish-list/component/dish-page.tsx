import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import { ListView } from "antd-mobile";
import DishItem from './dish-item';

@inject('dishListStore')
@observer
export default class DishPage extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.props.dishListStore.queryDishPage().then();
  }

  render() {
    return (
      <ListView
        renderRow={(rowData, sectionID, rowID) => {
          return <DishItem dish={rowData} key={rowID} />;
        }}
        dataSource={this.props.dishListStore.dataList}
        onEndReached={this.props.dishListStore.queryDishPage}
      />
    );
  }
}
