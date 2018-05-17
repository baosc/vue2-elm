import Vue from 'vue';
import Router from 'vue-router';
import home from '@/pages/home/home';
import less from '@/pages/less/less';

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
    {
      path: '/less',
      component: less,
    },
  ],
});
