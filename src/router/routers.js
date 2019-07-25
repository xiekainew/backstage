import Layout from '@/pages/layout'

let routes = [
  {
    path: '/',
    redirect: '/dashboard'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  }
]

export default routes

export const asyncRouterMap = {
    path: '/',
    component: Layout,
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard')
    }, {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/user')
    }, {
      path: '/database',
      name: 'database',
      component: () => import('@/pages/database')
    }, {
      path: '/menu',
      name: 'menu',
      component: () => import('@/pages/config/menu.vue')
    }, {
      path: '/image',
      name: 'image',
      component: () => import('@/pages/picture/index.vue')
    }]
  }
