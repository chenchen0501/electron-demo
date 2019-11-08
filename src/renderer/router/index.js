import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Main = () => import('../views/main')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
