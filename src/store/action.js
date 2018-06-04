import {
  getUser,
  getAddressList,
} from '../service/getData';
import {
  GET_USERINFO,
  SAVE_ADDRESS,
} from './mutation-types';

export default {

  async getUserInfo ({
    commit,
    state,
  }) {
    const userInfo = state.userInfo; // TODO: 多余操作，eslint检查
    const res = await getUser(userInfo);
    commit(GET_USERINFO, res);
  },
  async saveAddress ({
    commit,
    state,
  }) {
    if (state.removeAddress.length > 0) return;

    const addres = await getAddressList(state.userInfo.user_id);
    commit(SAVE_ADDRESS, addres);
  },
};
