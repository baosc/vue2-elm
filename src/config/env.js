/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrlParam = '';
let routerModeParam = 'hash';
let imgBaseUrlParam = '';

if (process.env.NODE_ENV === 'development') {
  baseUrlParam = 'http://cangdu.org:8001';
  routerModeParam = 'hash';
  imgBaseUrlParam = '//elm.cangdu.org/img/';
} else if (process.env.NODE_ENV === 'production') {
  baseUrlParam = '//elm.cangdu.org';
  routerModeParam = 'hash';
  imgBaseUrlParam = '//elm.cangdu.org/img/';
}

const baseUrl = baseUrlParam;
const routerMode = routerModeParam;
const imgBaseUrl = imgBaseUrlParam;
export {
  baseUrl,
  routerMode,
  imgBaseUrl,
};
