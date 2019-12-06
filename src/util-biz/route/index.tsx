import React, { Component } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import cache from "../../util/common/cache";
import { isLogin } from "../login/loginUtil";

export interface MyRouteProps extends RouteProps{
  key: any;
  title?: string;
  withoutLogin?: boolean;
  hasBottom?: boolean;
}

/**
 * 简单封装路由
 */
export default class MyRoute extends Component<MyRouteProps, any> {

  render() {
    const {
      title,
      withoutLogin,
      hasBottom,
      location,
      ...rest
    } = this.props;
    document.title = title || '欢迎';

    // 1.无需登录 或 已登录,直接跳转对应路由
    if (withoutLogin || isLogin()) {
      return <Route
          {...rest}
      />
    } else {
      // 2.拦截准备访问的路由, 重定向到登陆页, 等登录成功后自动跳转到拦截的路由
      sessionStorage.setItem(cache.TARGET_PAGE, JSON.stringify(location));
      return <Redirect to={
        {
          pathname: '/login',
          state: {from: location}
        }
      } />;
    }
  }
}
