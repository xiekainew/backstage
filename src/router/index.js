import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

import routes, {asyncRouterMap} from './routers.js'
console.log(asyncRouterMap)
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
let flag = true
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (flag) {
      flag = false
      Store.dispatch('getMenu').then(() => {
        let routes = filterRouter(asyncRouterMap, Store.state.menuList)
        router.addRoutes(routes)
        next({...to, replece: true})
      }).catch(() => {
        next({path: '/login'})
      })
    } else {
      next()
    }
  }
})

const filterRouter = (asyncRouter, menu) => {
  asyncRouter.children = asyncRouter.children.filter(item => {
    return menu.some(i => {
      if (i.children && i.children.length) {
        return i.children.some(k => {
          return k.path === item.path
        })
      } else {
        return i.path === item.path
      }
    })
  })
  
  return [asyncRouter]
}

export default router
