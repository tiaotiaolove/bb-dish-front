import Loadable from 'react-loadable';
import MyLoading from './util-biz/loading';

/**
 * 路由配置文件
 *   withoutLogin:  true:可以直接访问,无需登陆; false:需要登录; 默认false
 *   bottomCurrTab: 底部导航栏应选中哪个;string类型,若没有底部导航栏,则无此属性
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
    bottomCurrTab: "index",
  },
  {
    path: '/upload-dish',
    title: '上传',
    exact: true,
    component: Loadable({
      loader: () => import('./page/dish-list'),
      loading: MyLoading
    }),
    bottomCurrTab: "upload",
  },
  {
    path: '/user-center',
    title: '我的',
    exact: true,
    component: Loadable({
      loader: () => import('./page/dish-list'),
      loading: MyLoading
    }),
    bottomCurrTab: "mine",
  },
  {
    path: '/user-info',
    title: '基本信息',
    exact: true,
    component: Loadable({
      loader: () => import('./page/dish-list'),
      loading: MyLoading
    }),
    bottomCurrTab: "mine",
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
