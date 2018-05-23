import Vue from 'vue';
import Router from 'vue-router';
import home from '@/pages/home/home';
import less from '@/pages/less/less';
import login from '@/pages/login/login';
import city from '@/pages/city/city';
import msite from '@/pages/msite/msite';

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
    {
      path: '/login',
      component: login,
    },
    {
      path: '/city/:cityid',
      component: city,
    },
    {
      path: '/msite',
      component: msite,
    },
  ],
});
