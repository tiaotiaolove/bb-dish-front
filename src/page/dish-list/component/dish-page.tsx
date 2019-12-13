import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { DishListStore } from "../store";
import MyListView from "../../../util-biz/list-view";
import constant from "../../../util/common/constant";
import DishItem from "./dish-item";

interface IDishListProps {
  dishListStore?: DishListStore | any;
}

@inject('dishListStore')
@observer
export default class DishPage extends Component<IDishListProps, any> {

  render() {
    return (
      <MyListView
        renderRow={(rowData: any) => <DishItem dish={rowData}/>}
        url={`${constant.HOST}/dish/page`}
        urlParams={{
          season: this.props.dishListStore.season
        }}
        pageSize={3}
      />
    );
  }

}
