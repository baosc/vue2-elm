import Vue from 'vue';
import Router from 'vue-router';
import home from '@/pages/home/home';
import less from '@/pages/less/less';
import login from '@/pages/login/login';
import city from '@/pages/city/city';
import msite from '@/pages/msite/msite';
import discover from '@/pages/discover/discover';
import order from '@/pages/order/order';
import profile from '@/pages/profile/profile';
import shop from '@/pages/shop/shop';

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
      meta: {
        keepAlive: true,
      },
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
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/discover',
      component: discover,
    },
    {
      path: '/order',
      component: order,
    },
    {
      path: '/profile',
      component: profile,
    },
    {
      path: '/shop',
      component: shop,
    },
  ],
});
