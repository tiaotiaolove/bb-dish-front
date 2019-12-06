import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

@inject('loginStore')
@observer
export default class AccountForm extends Component<any, any> {

  render() {
    let {
      account,
      password,
      isShowPassword,
      loginBtnStatus,
      changeAccount,
      changePassword,
      switchShowPass,
      doLogin
    } = this.props.loginStore;
    return (
      <div style={{ marginTop: 25, width: '75%' }}>
        <div className="login-item">
          <div className="inputBox">
            <input
              className="formInput"
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入您的手机号"
              value={account}
              maxLength={11}
              onChange={(e) => changeAccount(e.target.value)}
            />
          </div>
        </div>
        <div className="login-item">
          <div className="inputBox eyes-box">
            <input
              className="formInput"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="密码"
              pattern="/^[A-Za-z0-9]{6,16}$/"
              value={password}
              onChange={(e) => changePassword(e.target.value)}
              maxLength={16}
            />
            <i
              onClick={() => switchShowPass()}
              className={`iconfont icon-${
                isShowPassword ? 'yanjing' : 'iconguanbiyanjing'
              }`}
            >眼</i>
          </div>
        </div>
        {/*        <div className="findCode">
          <Link to="/user-safe-password">忘记密码</Link>
        </div>*/}
        <div className="login-btnBox">
          <button
            className={loginBtnStatus ? 'login-btn' : 'btn-disabled login-btn'}
            disabled={!loginBtnStatus}
            onClick={() => doLogin()}
          >
            {'登录'}
          </button>
        </div>
      </div>
    );
  }

}
