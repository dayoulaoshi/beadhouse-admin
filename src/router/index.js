import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/forget_password_ask',
    component: () => import('@/views/forgetpassword/forget_ask'),
    hidden: true
  },
  {
    path: '/forget_password',
    component: () => import('@/views/forgetpassword/forget_ask'),
    hidden: true
  },
  {
    path: '/forget_password_index',
    component: () => import('@/views/forgetpassword/index'),
    hidden: true
  },
  {
    path: '/forget_new_password',
    component: () => import('@/views/forgetpassword/forget_newpassword'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/customer_management',
    meta: {
      title: '客户管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'checkin_management',
        component: () => import('@/views/checkin_management/index'), // Parent router-view
        name: 'checkin_management',
        meta: {title: '入住管理'},
        children: [
          {
            path: 'checkin_management_list',
            component: () => import('@/views/checkin_management/checkin_list'),
            name: 'checkin_management_list',
            meta: {title: '入住列表'}
          },
          {
            path: 'checkin_management_list_add',
            component: () => import('@/views/checkin_management/checkin_add'),
            name: 'checkin_management_list_add',
            meta: {title: '入住添加'},
          }
        ]
      },
      {
        path: 'checkout_management',
        component: () => import('@/views/checkout_management/index'),
        name: 'checkout_management',
        meta: {title: '退住管理'},
        children: [
          {
            path: 'checkout_management_list',
            component: () => import('@/views/checkout_management/checkout_list'),
            name: 'checkout_management_list',
            meta: {title: '退住列表'}
          },
          {
            path: 'checkout_management_add',
            component: () => import('@/views/checkout_management/checkout_add'),
            name: 'checkout_management_list',
            meta: {title: '退住增加'},
          }
        ]
      },
      {
        path: 'out_management',
        component: () => import('@/views/out_management/index'),
        name: 'out_management',
        meta: {title: '外出管理'},
        children: [
          {
            path: 'out_management_list',
            component: () => import('@/views/out_management/out_list'),
            name: 'checkout_management_list',
            meta: {title: '外出列表'}
          },
          {
            path: 'out_management_add',
            component: () => import('@/views/out_management/out_add'),
            name: '外出新增',
            meta: {title: '外出新增'},
          }
        ]
      }
    ]
  },
  {
    path: '/bed_management',
    component: Layout,
    redirect: '/bed_management/menu1',
    // name: '床位管理',
    meta: {
      title: '床位管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'bed_management_list',
        component: () => import('@/views/bed_management/bed_list'), // Parent router-view
        name: 'bed_management_list',
        meta: {title: '床位列表'},
      },
      {
        path: 'bed_management_add',
        component: () => import('@/views/bed_management/bed_add'),
        name: 'bed_management_add',
        meta: {title: '床位添加'}
      }
    ]
  },
  {
    path: '/nurse_management',
    component: Layout,
    meta: {title: '护理管理', icon: 'form'},
    children: [
      {
        path: 'nurse_level_maintain',
        component: () => import('@/views/nurse_management/index'),
        meta: {title: '护理级别信息维护', icon: 'form'},
        name: 'nurse_maintain',
        children: [{
          path: 'nurse_list',
          component: () => import('@/views/nurse_management/nurse_level_maintain/nurse_list'),
          meta: {title: '护理级别', icon: 'form'},
        }, {
          path: 'nurse_list_add',
          component: () => import('@/views/nurse_management/nurse_level_maintain/nurse_list_add'),
          meta: {title: '新增护理级别', icon: 'form'},
        }]
      },
      {
        path: 'nurse_record_maintain',
        component: () => import('@/views/nurse_management/index'),
        name: 'nurse_maintain',
        meta: {title: '护理记录信息维护', icon: 'form'},
        children: [{
          path: 'nurse_record_list',
          component: () => import('@/views/nurse_management/nurse_record_maintain/nurse_record_list'),
          meta: {title: '护理记录', icon: 'form'},
        }, {
          path: 'nurse_record_add',
          component: () => import('@/views/nurse_management/nurse_record_maintain/nurse_record_add'),
          meta: {title: '护理记录新增', icon: 'form'},
        }
        ]
      }
    ]
  },
  {
    path: '/food_management',
    component: Layout,
    meta: {title: '膳食管理', icon: 'form'},
    children: [
      {
        path: 'food_management',
        component: () => import('@/views/food_management/index'),
        meta: {title: '膳食记录管理', icon: 'form'},
        name: 'food_management',
        children: [{
          path: 'food_management_list',
          component: () => import('@/views/food_management/food_management_list'),
          meta: {title: '膳食管理记录列表', icon: 'form'},
        }, {
          path: 'food_management_add',
          component: () => import('@/views/food_management/food_management_add'),
          meta: {title: '膳食管理记录新增', icon: 'form'},
        }]
      },
      {
        path: 'food',
        component: () => import('@/views/food_management/index'),
        meta: {title: '食物管理', icon: 'form'},
        name: 'food_management',
        children: [{
          path: 'food_list',
          component: () => import('@/views/food/food_list'),
          meta: {title: '食物列表', icon: 'form'},
        }, {
          path: 'food_add',
          component: () => import('@/views/food/food_add'),
          meta: {title: '食物新增', icon: 'form'},
        }]
      },
      {
        path: 'nurse_record_maintain',
        component: () => import('@/views/food_management/index'),
        name: 'nurse_maintain',
        meta: {title: '膳食日历展示', icon: 'form'},
        children: [{
          path: 'nurse_record_list',
          component: () => import('@/views/food_management/oldpeople_cal'),
          meta: {title: '老人膳食日历', icon: 'form'},
        }
        ]
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [


  /** when your routing map is too long, you can split it into small modules **/


  {
    path: '/person_management',
    component: Layout,
    meta: {
      title: "用户管理",
      icon: 'form',
      roles: ['admin'],
    },
    children: [{
      path: 'staff_management',
      component: () => import('@/views/staff_management/index'),
      meta: {
        title: "护士/护工/医生管理",
        icon: 'form',
      },
      name:"staff_management",
      children: [{
        path: "person_list",
        component:()=>import('@/views/staff_management/person_list'),
        meta: {title: '人员列表', icon: 'form'},
      },
        {
          path: "person_add",
          component:()=>import('@/views/staff_management/person_add'),
          meta: {title: '人员新增', icon: 'form'},
        }
      ]
    }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
