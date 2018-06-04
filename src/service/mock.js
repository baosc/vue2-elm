import shopMenu from './mockData/shopMenu';
import restaurant from './mockData/restaurant';


// 引入mockjs
const Mock = require('mockjs');

// 使用mockjs模拟数据
Mock.mock('/api/shopMenu', () => shopMenu);

Mock.mock('/api/restaurant', () => restaurant);
