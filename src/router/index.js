import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'
import Home from '@/pages/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/home'
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: '/home',
        name: 'home',
        component: Home
      }]
    }
  ]
})
