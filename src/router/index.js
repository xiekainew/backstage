import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'
import Home from '@/pages/home'
import Dashboard from '@/pages/dashboard'
import User from '@/pages/user'
import Database from '@/pages/database'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
    }
  ]
})
