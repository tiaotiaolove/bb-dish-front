import cache from "../../util/common/cache";
import history from "../../util/router/history";

/**
 * 判断是否登陆 & 设置参数
 */
const isLogin = (): boolean => {
  if (window.token) {
    return true;
  } else {
    //获取token
    const data = localStorage.getItem(cache.LOGIN_DATA);
    // 如果没有缓存数据，则需登陆
    if (!data) {
      return false;
    } else {
      //解析数据
      const loginData = JSON.parse(data);
      //全局保存token
      window.token = loginData.token;
      return true;
    }
  }
};

/**
 * 清空登录缓存信息
 */
const logout = () => {
  window.token = '';
  localStorage.removeItem(cache.LOGIN_DATA);
  history.push('/login');
};

export {
  isLogin,
  logout,
};
