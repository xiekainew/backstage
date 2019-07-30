import Layout from '@/pages/layout'
import Blog from '@/pages/markdown'
import Markdown from '@/pages/markdown/markdown'

let routes = [
  {
    path: '/',
    redirect: '/dashboard'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  }, {
    path: '/',
    component: Layout,
    children: [{
      path: '/markdown',
      name: 'markdown',
      meta: {
        activePath: '/blog'
      },
      component: Markdown
    }]
  }
]
export default routes

export const asyncRouterMap = {
    path: '/',
    component: Layout,
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "test-group" */ '@/pages/dashboard')
    }, {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home')
    }, {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "test-group" */ '@/pages/user')
    }, {
      path: '/database',
      name: 'database',
      component: () => import(/* webpackChunkName: "test-group" */ '@/pages/database')
    }, {
      path: '/menu',
      name: 'menu',
      component: () => import('@/pages/config/menu.vue')
    }, {
      path: '/image',
      name: 'image',
      component: () => import(/* webpackChunkName: "test-group" */ '@/pages/picture/index.vue')
    }, {
      path: '/blog',
      name: 'blog',
      component: Blog
    }]
  }
