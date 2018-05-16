import Vue from 'vue';
import Router from 'vue-router';
import home from '@/pages/home/home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      rediect: '/home',
    },
    {
      path: '/home',
      component: home,
    },
  ],
});
