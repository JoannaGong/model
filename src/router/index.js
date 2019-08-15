import Vue from 'vue'
import Router from 'vue-router'
import modelInfo from '../views/role/modelDetail/info'
import modelArtist from '../views/role/modelDetail/artist'
import modelServiceRecord from '../views/role/modelDetail/serviceRecord'
import companyInfo from '../views/role/companyDetail/info'
import companyArtist from '../views/role/companyDetail/artist'
import companyServiceRecord from '../views/role/companyDetail/serviceRecord'
import merchantInfo from '../views/role/mechant/info'
import model from '../views/annoucement/model'

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
        meta: { title: '会员管理', icon: 'user' },
        permission: '会员管理'
      },
      {
        path: 'role/:id/',
        component: () => import('@/views/role/detail'),
        name: 'RoleDetail',
        hidden: true,
        meta: { title: '查看' },
        children: [
          { path: 'modelInfo', component: modelInfo, hidden: true },
          { path: 'modelArtist', component: modelArtist, hidden: true },
          { path: 'modelServiceRecord', component: modelServiceRecord, hidden: true },
          { path: 'companyInfo', component: companyInfo, hidden: true },
          { path: 'companyArtist', component: companyArtist, hidden: true },
          { path: 'companyServiceRecord', component: companyServiceRecord, hidden: true },
          { path: 'merchantInfo', component: merchantInfo, hidden: true }
        ]
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/financeFlow',
    name: 'finance',
    meta: { title: '财务管理', icon: 'finance' },
    children: [
      {
        path: 'financeFlow',
        component: () => import('@/views/finance/financeFlow/index'),
        name: 'FinanceFlow',
        meta: { title: '财务流水记录', icon: 'financeFlow' },
        permission: '财务流水记录'
      },
      {
        path: 'financeStatistic',
        component: () => import('@/views/finance/financeStatistic/index'),
        name: 'FinanceStatistic',
        meta: { title: '财务统计', icon: 'financeStatistic' },
        permission: '财务统计'
      },
      {
        path: 'withdrawAudit',
        component: () => import('@/views/finance/withdrawAudit/index'),
        name: 'WithdrawAudit',
        meta: { title: '提现审核', icon: 'withdrawAudit' },
        permission: '提现审核'
      },
      {
        path: 'withdrawAudit/:id',
        component: () => import('@/views/finance/withdrawAudit/detail'),
        name: 'WithdrawAuditTable',
        hidden: true,
        meta: { title: '财务流水记录表单', icon: 'withdrawAudit' }
      }
    ]
  },

  {
    path: '/setup',
    name: 'setup',
    component: Layout,
    redirect: '/setup/account',
    meta: { title: '基础功能', icon: 'setUp' },
    children: [
      {
        path: 'account',
        component: () => import('@/views/setup/account/index'),
        name: 'Account',
        meta: { title: '账号管理', icon: 'account' },
        permission: '账号管理'
      },
      {
        path: 'account/:id',
        component: () => import('@/views/setup/account/detail'),
        name: 'AccountTable',
        hidden: true,
        meta: { title: '账号管理表单', icon: 'account' }
      },
      {
        path: 'auth',
        component: () => import('@/views/setup/auth/index'),
        name: 'Auth',
        meta: { title: '角色管理', icon: 'auth' },
        permission: '角色管理'
      },
      {
        path: 'auth/:id',
        component: () => import('@/views/setup/auth/detail'),
        name: 'AuthTable',
        hidden: true,
        meta: { title: '角色管理表单', icon: 'account' }
      },
      {
        path: 'person',
        component: () => import('@/views/setup/person/index'),
        name: 'Setup',
        meta: { title: '个人信息', icon: 'user' },
        permission: '个人信息'
      }
    ]
  },

  {
    path: '/annoucement',
    name: 'annoucement',
    component: Layout,
    redirect: '/annoucement/index',
    meta: { title: '通告管理', icon: 'guide' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/annoucement/index'),
        name: 'Annoucement',
        meta: { title: '通告管理', icon: 'annoucement' },
        permission: '通告管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/annoucement/detail'),
        name: 'AnnoucementTable',
        hidden: true,
        meta: { title: '通告管理表单' },
        children: [
          { path: 'model', component: model, hidden: true }
        ]
      }
    ]
  },
  {
    path: '/production',
    name: 'production',
    component: Layout,
    redirect: '/production/index',
    meta: { title: '作品管理', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/production/index'),
        name: 'Production',
        meta: { title: '作品管理', icon: 'production' },
        permission: '作品管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/production/detail'),
        name: 'ProductionTable',
        hidden: true,
        meta: { title: '作品管理表单' }
      }
    ]
  },
  {
    path: '/certification',
    name: 'certification',
    component: Layout,
    redirect: '/certification/index',
    meta: { title: '认证管理', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/certification/index'),
        name: 'Certification',
        meta: { title: '认证管理', icon: 'certification' },
        permission: '认证管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/certification/detail'),
        name: 'CertificationTable',
        hidden: true,
        meta: { title: '认证管理表单' }
      }
    ]
  },

  {
    path: '/type',
    name: 'type',
    component: Layout,
    redirect: '/type/city',
    meta: { title: '类目管理', icon: 'list' },
    children: [
      {
        path: 'city',
        component: () => import('@/views/type/city/index'),
        name: 'City',
        meta: { title: '地区管理', icon: 'region' },
        permission: '地区管理'
      },
      {
        path: 'city/:id',
        component: () => import('@/views/type/city/detail'),
        name: 'CityTable',
        hidden: true,
        meta: { title: '地区管理表单', icon: 'region' }
      },
      {
        path: 'label',
        component: () => import('@/views/type/label/index'),
        name: 'Label',
        meta: { title: '标签管理', icon: 'label' },
        permission: '标签管理'
      },
      {
        path: 'label/:id',
        component: () => import('@/views/type/label/detail'),
        name: 'LabelTable',
        hidden: true,
        meta: { title: '标签管理表单', icon: 'label' }
      }
    ]
  },

  {
    path: '/dataDict',
    name: 'dataDict',
    component: Layout,
    redirect: '/dataDict/index',
    meta: { title: '数据字典', icon: 'dataDict' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/dataDict/index'),
        name: 'DataDict',
        hidden: true,
        meta: { title: '数据字典列表' },
        permission: '数据字典'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/dataDict/detail'),
        name: 'dataDictTable',
        hidden: true,
        meta: { title: '数据字典表单' }
      }
    ]
  },
  {
    path: '/complaint',
    name: 'complaint',
    component: Layout,
    redirect: '/complaint/index',
    meta: { title: '投诉管理', icon: 'complaint' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/complaint/index'),
        name: 'Complaint',
        meta: { title: '投诉管理' },
        permission: '投诉管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/complaint/detail'),
        name: 'complaintTable',
        hidden: true,
        meta: { title: '投诉管理表单' }
      }
    ]
  },
  {
    path: '/afterSales',
    name: 'afterSales',
    component: Layout,
    redirect: '/afterSales/index',
    meta: { title: '售后管理', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/afterSales/index'),
        name: 'AfterSales',
        meta: { title: '售后管理', icon: 'afterSales' },
        permission: '售后管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/afterSales/detail'),
        name: 'AfterSalesTable',
        hidden: true,
        meta: { title: '售后管理表单', icon: 'afterSales' }
      }
    ]
  },
  {
    path: '/service',
    name: 'service',
    component: Layout,
    redirect: '/service/index',
    meta: { title: '服务管理', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/service/index'),
        name: 'Service',
        meta: { title: '服务管理', icon: 'service' },
        permission: '服务管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/service/detail'),
        name: 'ServiceTable',
        hidden: true,
        meta: { title: '服务管理表单', icon: 'service' }
      }
    ]
  },
  {
    path: '/banner',
    name: 'banner',
    component: Layout,
    redirect: '/banner/index',
    meta: { title: 'banner管理', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/banner/index'),
        name: 'Banner',
        meta: { title: 'banner管理', icon: 'banner' },
        permission: 'banner管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/banner/detail'),
        name: 'BannerTable',
        hidden: true,
        meta: { title: 'banner管理表单', icon: 'banner' }
      }
    ]
  },
  {
    path: '/module',
    name: 'module',
    component: Layout,
    redirect: '/module/index',
    meta: { title: '首页模块管理', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/module/index'),
        name: 'Module',
        meta: { title: '首页模块管理', icon: 'module' },
        permission: '首页模块管理'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/module/detail'),
        name: 'moduleTable',
        hidden: true,
        meta: { title: '首页模块管理表单', icon: 'module' }
      }
    ]
  },
  {
    path: '/activity',
    name: 'activity',
    component: Layout,
    redirect: '/activity/index',
    meta: { title: '活动管理', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/activity/index'),
        name: 'Activity',
        meta: { title: '活动管理', icon: 'activity' },
        permission: '活动管理'
      },
      {
        path: 'activityForm/:id',
        component: () => import('@/views/activity/activityForm'),
        name: 'activityDetail',
        hidden: true,
        meta: { title: '活动管理表单', icon: 'activity' }
      },
      {
        path: 'index/:id',
        component: () => import('@/views/activity/detail'),
        name: 'activityTable',
        hidden: true,
        meta: { title: '活动管理表单', icon: 'activity' }
      }
    ]
  },
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
        meta: { title: '拍摄地管理', icon: 'location' },
        permission: '拍摄地管理'
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
  {
    path: '/dataStatistic',
    name: 'dataStatistic',
    component: Layout,
    redirect: '/dataStatistic/index',
    meta: { title: '数据统计', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/dataStatistic/index'),
        name: 'DataStatistic',
        meta: { title: '数据统计', icon: 'dataStatistic' },
        permission: '数据统计'
      },
      {
        path: 'index/:id',
        component: () => import('@/views/dataStatistic/detail'),
        name: 'DataStatisticTable',
        hidden: true,
        meta: { title: '数据统计表单', icon: 'location' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = []
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
