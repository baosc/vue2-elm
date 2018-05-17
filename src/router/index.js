import Vue from 'vue';
import Router from 'vue-router';
import home from '@/pages/home/home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
    },
    {
      path: '/home',
      component: home,
    },
  ],
});
