import Layout from '@/pages/layout'
import Home from '@/pages/home'
import Dashboard from '@/pages/dashboard'
import User from '@/pages/user'
import Database from '@/pages/database'

const routes = [
    {
      path: '/',
      redirect: '/dashboard'
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      }]
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: '/home',
        name: 'home',
        component: Home
      }]
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: '/user',
        name: 'user',
        component: User
      }]
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: '/database',
        name: 'database',
        component: Database
      }]
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: '/menu',
        name: 'menu',
        component: () => import('@/pages/config/menu.vue')
      }]
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: '/image',
        name: 'image',
        component: () => import('@/pages/picture/index.vue')
      }]
    }
  ]

  export default routes
