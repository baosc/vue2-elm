import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
  userInfo: null, // 用户信息
  count: 0,
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
export default store;
