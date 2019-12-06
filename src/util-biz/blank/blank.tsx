import React, { Component } from 'react';
import history from "../../util/router/history";

interface BlankProps {
  tips?: string;
  content?: string;
  img?: string;
  toIndex?: boolean;
}

export default class Blank extends Component<BlankProps, any> {

  static defaultProps = {
    content: '',
    img: require('./img/list-none.png'),
    toIndex: false
  };

  render() {
    const { tips, content, img, toIndex } = this.props;
    return (
      <div className="list-none">
        <img src={img} alt="list-none"/>
        <p>{content}</p>
        <p className="grey-tips">{tips}</p>
        {toIndex && (
          <div className="half">
            <button
              className="btn btn-ghost"
              onClick={() => history.push({ pathname: '/' })}
            >
              回首页
            </button>
          </div>
        )}
      </div>
    );
  }
}
