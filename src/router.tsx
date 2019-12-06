import Loadable from 'react-loadable';
import MyLoading from './util-biz/loading';

/**
 * 路由配置文件
 *   withoutLogin  true:可以直接访问,无需登陆; false:需要登录; 默认false
 *   hasBottom     true:有底部导航栏; false:没有底部导航栏; 默认false
 */
const routers = [
  {
    path: '/',
    title: '首页',
    exact: true,
    component: Loadable({
      loader: () => import('./page/dish-list'),
      loading: MyLoading
    }),
    hasBottom: true
  },
  {
    path: '/upload-dish',
    title: '上传',
    exact: true,
    component: Loadable({
      loader: () => import('./page/dish-list'),
      loading: MyLoading
    }),
    hasBottom: true
  },
  {
    path: '/user-center',
    title: '我的',
    exact: true,
    component: Loadable({
      loader: () => import('./page/dish-list'),
      loading: MyLoading
    }),
    hasBottom: true
  },
  {
    path: '/user-info',
    title: '基本信息',
    exact: true,
    component: Loadable({
      loader: () => import('./page/dish-list'),
      loading: MyLoading
    }),
    hasBottom: true
  },
  {
    path: '/login',
    title: '登陆',
    exact: true,
    component: Loadable({
      loader: () => import('./page/login'),
      loading: MyLoading
    }),
    withoutLogin: true,
    hasBottom: false
  },

  /*===================== 不配置path，什么都匹配不到的情况匹配这个，要放最后 =====================*/
  {
    path: '',
    title: '找不到页面',
    exact: true,
    component: Loadable({
      loader: () => import('./util-biz/error'),
      loading: MyLoading
    }),
    withoutLogin: true
  }
];

export { routers };
