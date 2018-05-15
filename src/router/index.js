import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import home from '@/pages/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          rediect: '/home'
        },
        {
          path: '/home',
          component: home
        }
      ]
    }
  ]
})
