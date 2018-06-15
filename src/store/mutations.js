import {
  GET_USERINFO,
  SAVE_GEOHASH,
  RECODE_ADDRESS,
  INIT_BUYCART,
  ADD_CART,
} from './mutation-types';

import { setStore, getStore } from '../config/mUtils'

export default {
  // 获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    }
    if (!state.login) {
      return;
    }
    if (!info.message) {
      state.userInfo = {
        ...info,
      };
    } else {
      state.userInfo = null;
    }
  },
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
  [RECODE_ADDRESS](state, { latitude, longitude }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  [INIT_BUYCART]() {
  },
  [ADD_CART](state, { shopid, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock }) {
    let cart = state.cartList;
    let shop = cart[shopid] = (cart[shopid] || {});
    let category = shop[category_id] = (shop[category_id] || {});
    let item = category[item_id] = (shop[item_id] || {});
    if (item[food_id]) {
      item[food_id].num ++;
    } else {
      item[food_id] = {
        num: 1,
        id: food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
      };
    }
    state.cartList = { ...cart };
    // 存入localStorage
    setStore('buyCart', state.cartList);
  },
};
