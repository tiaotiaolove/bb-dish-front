import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import {Flex} from "antd-mobile";

interface IDishItemProps {
  dish: {
    dishId: number;
    season: number;
    oilyDegree: number;
    dishType: number | null;
    dishName: string;
    dishDesc: string | null;
    dishPic: string | null;
    hotGrade: number;
  }
}

@inject('dishListStore')
@observer
export default class DishItem extends Component<IDishItemProps, any> {

  render() {
    let { dish } = this.props;
    return (
      <div className="list-item-box" key={dish.dishId}>
        <Link to={`/dish-detail/${dish.dishId}`}>
          <Flex className="list-item">
            <div className="list-item-left">
              {
                dish.dishPic ? <img src={dish.dishPic} alt="dishImg"/> : <i className="dishfont middle-none-img">&#xe669;</i>
              }
            </div>

            <Flex className="list-item-right" direction="column" justify="between" align="start">
              <h3 className="text-h3 nowrap-text">{dish.dishName}</h3>
              <p className="text-brief nowrap-text">{dish.dishDesc}</p>
              <Flex className="item-line" justify="between">
                <Flex>
                  {this._getSeasonDesc(dish.season)}
                  {this._getOilyDegreeDesc(dish.oilyDegree)}
                  {this._getDishType(dish.oilyDegree)}
                </Flex>
                <div className="hot-grade">
                  {dish.hotGrade}
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Link>
      </div>
    );
  }

  /**
   * 获取油腻程度的描述
   * @private
   */
  _getOilyDegreeDesc = (oilyDegree: number) => {
    const oilyMap: any = { 0: '纯素', 1: '小荤', 2: '大荤' };
    return <div className="oily-degree">{oilyMap[oilyDegree]}</div>;
  };

  /**
   * 获取菜品种类的描述
   * @private
   */
  _getDishType = (dishType: number) => {
    const typeMap: any = {
      0: '凉菜',
      1: '炒菜',
      2: '红烧',
      3: '汤羹',
      4: '果盘'
    };
    return <div className="dish-type">{typeMap[dishType]}</div>;
  };

  /**
   * 获取季节
   * @private
   */
  _getSeasonDesc = (season: number) => {
    const seasonMap: any = { 0: '春季', 1: '夏季', 2: '秋季', 3: '冬季' };
    return <div className="season">{seasonMap[season]}</div>;
  };
}
