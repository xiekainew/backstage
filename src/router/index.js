import Vue from 'vue'
import Router from 'vue-router'

import routes from './routers.js'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    next()
})

export default router
