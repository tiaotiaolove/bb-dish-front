import { action, observable } from 'mobx'
import { Base64 } from 'js-base64';
import { testTel, testPass } from '../../util/common/kit';
import {axiosFetch, handleResp} from "../../util/common/http";
import cache from '../../util/common/cache';
import history from "../../util/router/history";

export class LoginStore {
  // 账号
  @observable account: string = '';
  // 密码
  @observable password: string = '';
  // 是否显示密码
  @observable isShowPassword: boolean = false;
  // 登录按钮是否可点击
  @observable loginBtnStatus: boolean = true;

  /**
   * 修改账号
   */
  @action changeAccount = (account: string): void => {
    this.account = account;
  };

  /**
   * 修改密码
   */
  @action changePassword = (password: string): void => {
    this.password = password;
  };

  /**
   * 切换是否显示密码
   */
  @action switchShowPass = (): void => {
    this.isShowPassword = !this.isShowPassword;
  }

  /**
   * 登录
   */
  @action doLogin = async () => {
    let result = null;
    // 1.获取用户名和密码，并去除首尾空格
    const account = this.account.trim();
    const password = this.password.trim();

    // 2.登录验证
    if (testTel(account) && testPass(password)) {
      this.loginBtnStatus = false;
      result = await axiosFetch('/user/login', {
        method: 'POST',
        data: {
          account: Base64.encode(account),
          password: Base64.encode(password)
        }
      });
      if (handleResp(result)) {
        _switchLogin(result.context);
      }
      this.loginBtnStatus = true;
    }
  }
}

/**
 * 设置缓存并跳转路由
 */
const _switchLogin = (context: any) => {
  // a.设置登陆后token以及登陆信息缓存
  window.token = context.token;
  localStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));

  // b.跳转登陆后的具体路由
  const {pathname, ...rest} = JSON.parse(sessionStorage.getItem(cache.TARGET_PAGE) || '{}');
  sessionStorage.removeItem(cache.TARGET_PAGE);
  history.push({
    pathname: pathname || '/',
    ...rest
  });
};

export default new LoginStore();
