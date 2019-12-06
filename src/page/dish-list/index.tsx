import React from 'react';
import DishListTop from "./component/dish-list-top";
import DishPage from "./component/dish-page";

export default class DishList extends React.Component<any, any> {

  render() {
    return (
      <div>
        <DishListTop/>
        <DishPage/>
      </div>
    );
  }
}
