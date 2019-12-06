import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

const tabStatus = [
  { tabLabel: '全部', tabKey: '' },
  { tabLabel: '春季', tabKey: '0' },
  { tabLabel: '夏季', tabKey: '1' },
  { tabLabel: '秋季', tabKey: '2' },
  { tabLabel: '冬季', tabKey: '3' }
];

@inject('dishListStore')
@observer
export default class DishListTop extends Component<any, any> {

  render() {
    const { tabKey, changeDishTab } = this.props.dishListStore;

    return (
      <div style={{ height: 40 }}>
        <div className="layout-top">
          <div className="layout-content">
            {tabStatus.map((o) => (
              <div
                key={o.tabKey}
                className={`layout-item ${o.tabKey === tabKey && 'cur'}`}
                onClick={() => {
                  changeDishTab(o.tabKey);
                }}
              >
                {o.tabLabel}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
