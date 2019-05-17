import Vue from 'vue'
import Router from 'vue-router'

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
  { path: '/test', component: () => import('@/views/test/index'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/customer',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/table',
    name: 'customer',
    meta: { title: '会员管理', icon: 'customer' },
    children: [
      {
        path: 'table',
        name: 'customerTable',
        permission: 'member_manage',
        component: () => import('@/views/customer/index'),
        meta: { title: '会员管理', icon: 'customer' }
      },
      {
        path: 'table/:id',
        hidden: true,
        name: 'customerTable1',
        permission: 'member_manage',
        component: () => import('@/views/customer/index'),
        meta: { title: '会员管理', icon: 'customer' }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/table',
    name: 'project',
    meta: { title: '项目管理', icon: 'activity' },
    children: [
      {
        path: 'table',
        name: 'projectTable',
        permission: 'project_manage',
        component: () => import('@/views/project/index'),
        meta: { title: '项目列表', icon: 'project' }
      },
      {
        path: 'table/:id',
        name: 'projectForm',
        hidden: true,
        component: () => import('@/views/project/indexForm'),
        meta: { title: '项目表单', icon: 'content' }
      },
      {
        path: 'signup',
        name: 'projectSignup',
        permission: 'signup_form_manage',
        component: () => import('@/views/project/signup'),
        meta: { title: '报名表配置', icon: 'content' }
      },
      {
        path: 'signup/:id',
        name: 'projectSignup1',
        component: () => import('@/views/project/signupForm'),
        hidden: true,
        meta: { title: '报名表配置', icon: 'content' }
      },
      {
        path: 'process',
        name: 'projectProcess',
        permission: 'flow_manage',
        component: () => import('@/views/project/process'),
        meta: { title: '流程配置', icon: 'apply' }
      },
      {
        path: 'process/:id',
        name: 'projectProcess1',
        hidden: true,
        component: () => import('@/views/project/processForm'),
        meta: { title: '流程配置', icon: 'apply' }
      },
      {
        path: 'mail',
        name: 'projectMail',
        permission: 'mail_manage',
        component: () => import('@/views/project/mail'),
        meta: { title: '邮件模板', icon: 'goods' }
      },
      {
        path: 'mail/:id',
        name: 'projectMail1',
        component: () => import('@/views/project/mailForm'),
        hidden: true,
        meta: { title: '邮件模板', icon: 'goods' }
      },
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/table',
    name: 'activity',
    meta: { title: '活动管理', icon: 'active' },
    children: [
      {
        path: 'list',
        name: 'activityList',
        permission: 'activity_manage',
        component: () => import('@/views/activity/index'),
        meta: { title: '活动内容管理', icon: 'content' }
      },
      {
        path: 'list/:id',
        name: 'activityListShow',
        hidden: true,
        component: () => import('@/views/activity/indexInfo'),
        meta: { title: '活动内容管理', icon: 'content' }
      },
      {
        path: 'change',
        name: 'activityChange',
        permission: 'change_application_manage',
        component: () => import('@/views/activity/change'),
        meta: { title: '活动报名变更管理', icon: 'change' }
      },
      {
        path: 'change/:id',
        name: 'activityChange1',
        hidden: true,
        permission: 'change_application_manage',
        component: () => import('@/views/activity/change'),
        meta: { title: '活动报名变更管理', icon: 'change' }
      },
      {
        path: 'apply',
        name: 'activityApply',
        permission: 'signup_manage',
        component: () => import('@/views/activity/apply'),
        meta: { title: '报名申请管理', icon: 'activeApply' }
      },
      {
        path: 'apply/:id',
        name: 'activityApply1',
        hidden: true,
        component: () => import('@/views/activity/applyForm'),
        meta: { title: '报名申请管理', icon: 'activeApply' }
      }
    ]
  },
  {
    path: '/integral',
    component: Layout,
    redirect: '/integral/apply',
    name: 'integral',
    meta: { title: '积分管理', icon: 'integral' },
    children: [
      {
        path: 'apply',
        name: 'integralApply',
        permission: 'integral_application_manage',
        component: () => import('@/views/integral/index'),
        meta: { title: '积分申请管理', icon: 'apply' }
      },
      {
        path: 'apply/:id',
        name: 'integralApply1',
        hidden: true,
        permission: 'integral_application_manage',
        component: () => import('@/views/integral/index'),
        meta: { title: '积分申请管理', icon: 'apply' }
      },
      {
        path: 'level',
        name: 'integralLevel',
        permission: 'integral_level_manage',
        component: () => import('@/views/integral/level'),
        meta: { title: '积分等级管理', icon: 'level' }
      },
      {
        path: 'goods',
        name: 'integralGoods',
        permission: 'integral_goods_manage',
        component: () => import('@/views/integral/goods'),
        meta: { title: '积分商品管理', icon: 'goods' }
      },
      {
        path: 'goods/:id',
        name: 'integralGoods1',
        component: () => import('@/views/integral/goodsForm'),
        hidden: true,
        meta: { title: '积分商品管理', icon: 'goods' }
      },
      {
        path: 'order',
        name: 'integralOrder',
        permission: 'integral_order_manage',
        component: () => import('@/views/integral/order'),
        meta: { title: '积分订单管理', icon: 'order' }
      }
    ]
  },
  {
    path: '/org',
    component: Layout,
    redirect: '/org/company',
    name: 'org',
    meta: { title: '团体管理', icon: 'group' },
    children: [
      {
        path: 'company',
        name: 'orgCompany',
        hidden: true,
        component: () => import('@/views/org/company'),
        meta: { title: '企业管理', icon: 'company' }
      },
      {
        path: 'org',
        name: 'orgOrg',
        permission: 'group_manage',
        component: () => import('@/views/org/group'),
        meta: { title: '团体管理', icon: 'group_sub' }
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/tag/table',
    name: 'tag',
    meta: { title: '标签管理', icon: 'tag' },
    children: [
      {
        path: 'table',
        name: 'tagTable',
        permission: 'tag_manage',
        component: () => import('@/views/tag/index'),
        meta: { title: '标签管理', icon: 'tag' }
      }
    ]
  },
  {
    path: '/setup',
    component: Layout,
    redirect: '/setup/notice',
    name: 'setup',
    meta: { title: '设置', icon: 'setUp' },
    children: [
      {
        path: 'dictionary',
        name: 'setupDictionary',
        permission: 'data_dictionary_manage',
        component: () => import('@/views/setup/dictionary'),
        meta: { title: '数据字典', icon: 'notice' }
      },
      {
        path: 'notice',
        name: 'setupNotice',
        permission: 'event_manage',
        component: () => import('@/views/setup/notice'),
        meta: { title: '事件提醒', icon: 'notice' }
      },
      {
        path: 'black',
        name: 'setupBlack',
        permission: 'blacklist_manage',
        component: () => import('@/views/setup/black'),
        meta: { title: '黑名单管理', icon: 'black' }
      },
      {
        path: 'month',
        name: 'setupMonth',
        permission: 'monthly_donation_manage',
        component: () => import('@/views/setup/addIntegral'),
        meta: { title: '月捐导入加分', icon: 'month' }
      },
      {
        path: 'member',
        name: 'setupMember',
        permission: 'member_data_manage',
        component: () => import('@/views/setup/member'),
        meta: { title: '成员数据导入', icon: 'customer' }
      },
      {
        path: 'role',
        name: 'setupRole',
        permission: 'permission_manage',
        component: () => import('@/views/setup/role'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'user',
        name: 'userTable',
        permission: 'account_manage',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user_group' }
      }
      // {
      //   path: 'station',
      //   name: 'setupStation',
      //   component: () => import('@/views/setup/post'),
      //   meta: { title: '岗位管理', icon: 'station' }
      // }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: '外链', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/table',
  //   name: 'Example1',
  //   meta: { title: '权限', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table1',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '表格', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree1',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '树', icon: 'tree' }
  //     }
  //   ]
  // }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
