import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import noneImg from '../img/none.png';
import history from "../../../util/router/history";

@inject('dishListStore')
@observer
export default class DishItem extends Component<any, any> {

  render() {
    let { dish } = this.props;
    return (
      <div className="ships">
        <div className="dish-item">
          <Link to={`/dish-detail/${dish.dishId}`}>
            <div className="dish-head">
              <div className="dish-head-num">
                {dish.hotGrade > 1 && <span>赞</span>}
                <div className="dish-storeName">
                  {this._getOilyDegreeDesc(dish.oilyDegree)}
                  {dish.dishName}
                </div>
              </div>
              <div className="status">{this._getDishType(dish.dishType)}</div>
            </div>
            <div className="limit-img ship-img">
              <div className="img-content">
                <img
                  className="img-item"
                  src={dish.dishPic ? dish.dishPic : noneImg}
                  alt="dishPic"
                />
              </div>
              <div className="right-context">
                <div className="total-num">热度:{dish.hotGrade}</div>
                <i className="iconfont icon-jiantou1" />
              </div>
            </div>
          </Link>
          <div className="bottom">
            <div className="price">{this._getSeasonDesc(dish.season)}</div>
            <div className="botton-box">
              <div
                className={'btn btn-ghost btn-small'}
                onClick={() => {
                  history.push(`/dish-detail/${dish.dishId}`);
                }}
              >
                查看详情
              </div>
            </div>
          </div>
        </div>
        <div className="bot-line" />
      </div>
    );
  }

  /**
   * 获取油腻程度的描述
   * @private
   */
  _getOilyDegreeDesc = (oilyDegree: number) => {
    const oilyMap: any = { 0: '纯素', 1: '小荤', 2: '大荤' };
    return <div className="self-sales">{oilyMap[oilyDegree]}</div>;
  };

  /**
   * 获取菜品种类的描述
   * @private
   */
  _getDishType = (dishType: number) => {
    const typeMap: any = {
      0: '凉菜类',
      1: '炒菜类',
      2: '红烧类',
      3: '汤类',
      4: '果盘类'
    };
    return <div className="self-sales">{typeMap[dishType]}</div>;
  };

  /**
   * 获取季节
   * @private
   */
  _getSeasonDesc = (season: number) => {
    const seasonMap: any = { 0: '春', 1: '夏', 2: '秋', 3: '冬' };
    return <div className="self-sales">{seasonMap[season]}</div>;
  };
}
