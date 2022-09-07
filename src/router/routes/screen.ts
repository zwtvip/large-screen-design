/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '/@/router/types';

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/screen/themeList',
    name: 'ThemeList',
    component: () => import('/@/views/screen/screen-design/index.vue'),
    meta: {
      title: '主题列表',
      ignoreAuth: false,
    },
  },
  {
    path: '/screen/cardList',
    name: 'CardList',
    component: () => import('/@/views/screen/screen-design/index.vue'),
    meta: {
      title: '卡片列表',
      ignoreAuth: false,
    },
  },
  {
    path: '/screen/themeView',
    name: 'ThemeView',
    component: () => import('/@/views/screen/screen-design/index.vue'),
    meta: {
      title: '',
      ignoreAuth: false,
    },
  },
  {
    path: '/screen/themeManage',
    name: 'ThemeManage',
    component: () => import('/@/views/screen/screen-design/index.vue'),
    meta: {
      title: '',
      ignoreAuth: false,
    },
  },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
