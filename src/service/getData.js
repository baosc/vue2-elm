import fetch from '../config/fetch';
import { getStore } from '../config/mUtils';


/**
 * 获取定位城市信息
 */
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess',
});

/**
 * 获取热门城市
 */
export const hotCity = () => fetch('/v1/cities', {
  type: 'hot',
});

/**
 * 获取所有城市
 */
export const groupCity = () => fetch('/v1/cities', {
  type: 'group',
});

/**
 * 获取搜索地址
 */
export const searchPlace = (cityid, keyword) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword,
});

/**
 * 获取城市信息
 */
export const currentCity = number => fetch(`/v1/cities/${number}`);
/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', { user_id: getStore('user_id') });

export const getAddressList = () => fetch('/v1/user', { user_id: getStore('user_id') });

/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms',
}, 'POST');

/**
 * 获取图片验证码
 */
export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST');
