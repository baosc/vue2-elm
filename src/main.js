// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store/';
import './config/rem';
import './assets/icon/iconfont.css';
import { getClientIp } from './service/getData';

Vue.config.productionTip = false;

Vue.use(Vuex);

const previewUrl = getClientIp();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    previewUrl,
  },
  router,
  store,
  components: { App },
  template: '<App/>',
});
