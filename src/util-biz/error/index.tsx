import React, { Component } from 'react';
import history from "../../util/router/history";

export default class ErrorPage extends Component<any, any> {
  render() {
    return (
      <div className="list-none">
        <img src={require('./img/none.png')} width="200px" height="200px" alt='none'/>
        <p>啊哦，页面不见了</p>
        <div className="half">
          <button
            className="btn btn-ghost"
            onClick={() => history.replace('/')}
          >
            去首页
          </button>
        </div>
      </div>
    );
  }
}
