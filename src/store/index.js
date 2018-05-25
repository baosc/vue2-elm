import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  userInfo: null, // 用户信息
  count: 0,
  geohash: '', // //地址geohash值
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
export default store;
