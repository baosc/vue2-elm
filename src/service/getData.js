import fetch from '../config/fetch';
import { getStore } from '../config/mUtils';

export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess',
});

export const hotcity = () => fetch('/v1/cities', {
  type: 'hot',
});

/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', { user_id: getStore('user_id') });
