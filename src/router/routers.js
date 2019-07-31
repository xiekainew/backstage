import Layout from '@/pages/layout'
import Blog from '@/pages/markdown'
import Markdown from '@/pages/markdown/markdown'
import HeaderImage from '@/pages/login/headerImage'

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
    }, {
      path: '/header',
      name: 'header',
      meta: {
        bread: [{
          title: '修改头像'
        }]
      },
      component: HeaderImage
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
      component: () => import('@/pages/config/menu.vue'),
      meta: {
        bread: [{
          title: '配置管理'
        }, {
          title: '菜单栏'
        }]
      }
    }, {
      path: '/image',
      name: 'image',
      meta: {
        bread: [{
          title: '图片管理'
        }]
      },
      component: () => import(/* webpackChunkName: "test-group" */ '@/pages/picture/index.vue')
    }, {
      path: '/blog',
      name: 'blog',
      component: Blog
    }]
  }
