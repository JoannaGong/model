import Vue from 'vue'
import Router from 'vue-router'
import modelInfo from '../views/role/modelDetail/modelInfo'
import artist from '../views/role/modelDetail/artist'
import serviceRecord from '../views/role/modelDetail/serviceRecord'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

export const constantRouterMap = [
  // { path: '/test', component: () => import('@/views/test/index'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    redirect: '/role',
    component: Layout,
    name: 'Role',
    meta: { title: '会员管理', icon: 'user' },
    children: [
      {
        path: 'role',
        component: () => import('@/views/role/index'),
        name: 'RoleList',
        meta: { title: '会员列表', icon: 'user' }
      },
      {
        path: 'role/:id/',
        component: () => import('@/views/role/detail'),
        name: 'RoleDetail',
        hidden: true,
        meta: { title: '查看' },
        children: [
          { path: 'info', component: modelInfo, hidden: true },
          { path: 'artist', component: artist, hidden: true },
          { path: 'record', component: serviceRecord, hidden: true }
        ]
      }
    ]
  },
  // {
  //   path: '/finance',
  //   component: Layout,
  //   redirect: '/finance/financeFlow',
  //   name: 'finance',
  //   meta: { title: '财务管理', icon: 'finance' },
  //   children: [
  //     {
  //       path: 'financeFlow',
  //       component: () => import('@/views/finance/financeFlow/index'),
  //       name: 'FinanceFlow',
  //       meta: { title: '财务流水记录', icon: 'financeFlow' }
  //     },
  //     {
  //       path: 'financeStatistic',
  //       component: () => import('@/views/finance/financeStatistic/index'),
  //       name: 'FinanceStatistic',
  //       meta: { title: '财务统计', icon: 'financeStatistic' }
  //     },
  //     {
  //       path: 'withdrawAudit',
  //       component: () => import('@/views/role/index'),
  //       name: 'WithdrawAudit',
  //       meta: { title: '提现审核', icon: 'withdrawAudit' }
  //     }
  //   ]
  // },
  // {
  //   path: '/annoucement',
  //   name: 'annoucement',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '通告管理', icon: 'guide' },
  //   children: [
  //     {
  //       path: 'annoucement',
  //       component: () => import('@/views/role/index'),
  //       name: 'Annoucement',
  //       meta: { title: '通告管理', icon: 'annoucement' }
  //     }
  //   ]
  // },
  // {
  //   path: '/production',
  //   name: 'production',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '作品管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'production',
  //       component: () => import('@/views/role/index'),
  //       name: 'Profile',
  //       meta: { title: '作品管理', icon: 'production' }
  //     }
  //   ]
  // },
  // {
  //   path: '/certification',
  //   name: 'certification',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '认证管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'certification',
  //       component: () => import('@/views/role/index'),
  //       name: 'Certification',
  //       meta: { title: '认证管理', icon: 'certification' }
  //     }
  //   ]
  // },
  // {
  //   path: '/dataDict',
  //   name: 'dataDict',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '数据字典', icon: 'user' },
  //   children: [
  //     {
  //       path: 'dataDict',
  //       component: () => import('@/views/role/index'),
  //       name: 'DataDict',
  //       meta: { title: '数据字典', icon: 'dataDict' }
  //     }
  //   ]
  // },
  // {
  //   path: '/afterSales',
  //   name: 'afterSales',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '售后管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'afterSales',
  //       component: () => import('@/views/role/index'),
  //       name: 'AfterSales',
  //       meta: { title: '售后管理', icon: 'afterSales' }
  //     }
  //   ]
  // },
  // {
  //   path: '/service',
  //   name: 'service',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '服务管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'service',
  //       component: () => import('@/views/role/index'),
  //       name: 'Service',
  //       meta: { title: '服务管理', icon: 'service' }
  //     }
  //   ]
  // },
  // {
  //   path: '/banner',
  //   name: 'banner',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: 'banner管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'banner',
  //       component: () => import('@/views/role/index'),
  //       name: 'Banner',
  //       meta: { title: 'banner管理', icon: 'banner' }
  //     }
  //   ]
  // },
  // {
  //   path: '/module',
  //   name: 'module',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '首页模块管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'module',
  //       component: () => import('@/views/role/index'),
  //       name: 'Module',
  //       meta: { title: '首页模块管理', icon: 'module' }
  //     }
  //   ]
  // },
  // {
  //   path: '/activity',
  //   name: 'activity',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '活动管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'activity',
  //       component: () => import('@/views/role/index'),
  //       name: 'Activity',
  //       meta: { title: '活动管理', icon: 'activity' }
  //     }
  //   ]
  // },
  {
    path: '/location',
    name: 'location',
    component: Layout,
    redirect: '/location/index',
    meta: { title: '拍摄地管理', icon: 'location' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/location/index'),
        name: 'LocationList',
        hidden: true,
        meta: { title: '拍摄地列表', icon: 'location' }
      },
      {
        path: 'index/:id',
        component: () => import('@/views/location/detail'),
        name: 'LocationTable',
        hidden: true,
        meta: { title: '拍摄地表单', icon: 'location' }
      }
    ]
  },
  // {
  //   path: '/dataStatistic',
  //   name: 'dataStatistic',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: { title: '数据统计', icon: 'user' },
  //   children: [
  //     {
  //       path: 'dataStatistic',
  //       component: () => import('@/views/role/index'),
  //       name: 'DataStatistic',
  //       meta: { title: '数据统计', icon: 'dataStatistic' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = []
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
