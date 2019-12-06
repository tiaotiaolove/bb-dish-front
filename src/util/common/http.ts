import axios, { AxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';
import constant from './constant';
import { isLogin } from '../../util-biz/login/loginUtil';

interface IBaseResponse {
  code: string
  context: any
  message : string
}

// 创建axios实例并设置一些默认值
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = constant.HOST;
axiosInstance.defaults.timeout = constant.TIME_OUT;

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    if (!window.token) {
      // 手动请求某个页面, window.token会丢失, 这种情况下则需要从localStorage中获取一次;
      isLogin();
    }
    config.headers.common['Authorization'] = `Bearer ${window.token || ''}`;
    config.headers.common['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 发起异步请求
 * @param url 请求链接
 * @param config 配置项
 */
const axiosFetch = async (url: string, config?: AxiosRequestConfig): Promise<IBaseResponse> => {
  return axiosInstance(url, config).then(response => {
    return response.data;
  }).catch(error => {
    const { code, message } = error;
    console.error(`${url} 请求出错,`, error);
    const newResp = { code: code, message: message};
    if(code === 'ECONNABORTED' && message.indexOf('timeout') > -1) {
      newResp.message = '请求超时,请稍后重试';
    } else if (message.indexOf('Network Error') > -1) {
      newResp.message = '网络异常,请检查您的网络';
    }
    return newResp;
  });
};

/**
 * 处理请求返回值, 若并非成功码, 则提示错误信息
 * @param resp
 */
const handleResp = (resp : IBaseResponse): boolean => {
  const { code, message } = resp;
  if (code !== constant.SUCCESS_CODE) {
    Toast.fail(message);
    return false;
  }
  return true;
};

export {
  axiosFetch,
  handleResp,
};
