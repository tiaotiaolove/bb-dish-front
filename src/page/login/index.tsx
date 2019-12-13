import React from 'react';
import { inject, observer } from 'mobx-react'
import logo from './img/logo.svg';
import './css/style.less';
import AccountForm from './component/account-form';

@inject('loginStore')
@observer
export default class DishList extends React.Component<any, any>{

  render() {
    return (
      <div className="login-box">
        <div className="login-container">
          <div className="logo">
            <img
                src={logo}
                className="logoImg"
                alt=''
            />
          </div>
          <AccountForm />
        </div>
        <div style={{ width: '100%' }}>
          <div className="footer-copyright">
            <p>© 2018-2019 技术支持:小白</p>
          </div>
        </div>
      </div>
    );
  }
}
