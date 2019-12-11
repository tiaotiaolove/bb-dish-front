import React, { Component } from 'react';
import { TabBar } from "antd-mobile";
import "./css/style.css";
import history from "../../util/router/history";

interface BottomProps {
  // 选中哪个底部tab
  currTab?: string;
  // 是否隐藏底部导航栏
  hidden?: boolean;
}

/**
 * 底部导航栏
 */
export default class Bottom extends Component<BottomProps, any> {
  static defaultProps = {
    hidden: true,
  };

  render() {
    return (
      <>
        {/*占高的div*/}
        <div className={`bottomHiddenDiv${this.props.hidden ? " hidden" : ""}`}/>

        {/*底部导航栏*/}
        <div className={`myBottom${this.props.hidden ? " hidden" : ""}`}>
          <TabBar
            unselectedTintColor="#777777"
            tintColor="#108ee9"
            barTintColor="#FFFFFF"
          >
            <TabBar.Item
              key="index"
              title="首页"
              selected={this.props.currTab === 'index'}
              icon={<i className="dishfont">&#xe600;</i>}
              selectedIcon={<i className="dishfont">&#xe600;</i>}
              onPress={() => {
                history.push("/");
              }}
            />

            <TabBar.Item
              key="upload"
              title="上传"
              selected={this.props.currTab === 'upload'}
              icon={<i className="dishfont">&#xe672;</i>}
              selectedIcon={<i className="dishfont">&#xe672;</i>}
              onPress={() => {
                history.push("/upload-dish");
              }}
            />

            <TabBar.Item
              key="mine"
              title="我的"
              selected={this.props.currTab === 'mine'}
              icon={<i className="dishfont">&#xe614;</i>}
              selectedIcon={<i className="dishfont">&#xe614;</i>}
              onPress={() => {
                history.push("/user-center");
              }}
            />

          </TabBar>
        </div>
      </>
    );
  }

}
