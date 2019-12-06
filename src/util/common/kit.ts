import { Toast } from "antd-mobile";
import RegConst from './validate';

/**
 * 手机号公共校验方法
 * @param tel
 * @returns {boolean}
 */
const testTel = (tel: string) => {
  const regex = RegConst.phone;
  if (tel) {
    if (!regex.test(tel)) {
      Toast.success('手机号格式不正确！');
      return false;
    } else {
      return true;
    }
  } else {
    Toast.success('请填写手机号！');
    return false;
  }
};

/**
 * 校验密码，6-16个字母或数字
 */
const testPass = (pass: string) => {
  const regex = RegConst.password;
  if (pass) {
    if (!regex.test(pass)) {
      Toast.success('密码必须为6-16位字母或数字！');
      return false;
    } else {
      return true;
    }
  } else {
    Toast.success('请填写密码！');
    return false;
  }
};

/**
 * 节流函数(防抖)
 * @param func 真正执行的业务函数
 * @param wait 延迟时间
 * @returns {()=>undefined}
 */
const delayFunc = (func: Function, wait?: any) => {
  let timeout: any,
    context: any = null,
    args: any;
  wait = wait || 300;

  const later = function() {
    func.apply(context, args);
    timeout = context = args = null;
  };

  const throttled = function() {
    // context = this;
    args = arguments;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(later, wait);
  };

  return throttled;
}

export {
  testTel,
  testPass,
  delayFunc,
};
