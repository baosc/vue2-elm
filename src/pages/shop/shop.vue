<template>
  <div>
    <div class="shop-container">
      <header class="shop-header">
        <nav :style="shopSign" class="shop-header-nav">
          <i class="icon iconfont icon-back"></i>
        </nav>
        <section class="shop-header-sign">
          <img class="sign-logo" :style="shopLogo" />
          <div class="sign-shop">
            <h2>{{shopDetails.name}}</h2>
            <div>
              <span>{{shopDetails.rating}}</span>
              <span>月售{{shopDetails.recent_order_num}}单</span>
              <span>商家配送约 {{shopDetails.order_lead_time}}分钟</span>
              <span>距离 {{shopDetails.distance}}米</span>
            </div>
            <p></p>
          </div>
        </section>
      </header>
      <section class="shop-tab-container">
        <div class="shop-tab">点餐</div>
        <div class="shop-tab">评价</div>
        <div class="shop-tab">商家</div>
      </section>
      <section class="food-container"></section>
      <section class="rating-container"></section>
      <section class="info-container"></section>
    </div>
    <loading v-show="showLoading"></loading>
    <section class="shop-back-svg-container" v-if="showLoading">
      <img src="../../assets/images/shop_back_svg.svg">
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import loading from 'components/common/loading';
const baseImgUrl = 'https://fuss10.elemecdn.com/';
export default {
  components: { loading },
  data() {
    return {
      geohash: '',
      shopId: 0,
      shopDetails: {},
      menuList: [], //商品列表
      shopDiscuss: {},//评价
      showLoading: true, //显示加载动画
      windowHeight: null, //屏幕高度
    }
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    //网页初始化时从本地缓存获取购物车数据
    this.INIT_BUYCART();
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(['INIT_BUYCART']),
    async initData() {
      let shopMenu = await this.$axios.get('/api/shopMenu');
      let restaurant = await this.$axios.get('/api/restaurant');
      this.menuList = shopMenu.data;
      this.shopDetails = restaurant.data;
      console.log(this.menuList);
      console.log(this.shopDetails);
    },
    handlerImagePath(id) {
      const path = id.substr(0, 1) + '/' + id.substr(1, 2) + '/' + id.substr(3);
      const extend =  id.substr(32);
      return baseImgUrl + path + '.'+extend;
    }
  },
  computed: {
    shopSign() {
      let styles = {};
      if(this.shopDetails.shop_sign) {
        let url =  this.shopDetails.shop_sign.image_hash;
        url = this.handlerImagePath(url);
        styles = {
          'background-image': 'url(' + url + '?imageMogr/format/webp/)'
        }
      }
      return styles;
    },
    shopLogo() {
      let styles = {};
      if(this.shopDetails.image_path) {
        let url =  this.shopDetails.image_path;
        url = this.handlerImagePath(url);
        styles = {
          'background-image':
          `url(${url}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/)`,
        }
      }
      return styles;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';
.shop-container{
  background: #fff;
}
.shop-header{
  .shop-header-nav{
    position: relative;
    height: 4.2rem;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    &::before{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(to top, hsla(0, 0%, 100%, 0), rgba(0,0,0,.5))
    }
    i{
      position: absolute;
      top: .4rem;
      padding-left: .5rem;
      color: #fff;
      font-size: .895rem;
    }
  }
  .shop-header-sign{
    position: relative;
    img{
      .centerLeft();
      top: -1.5rem;
      width: 3rem;
      height: 3rem;
      background-size: cover;
      z-index: 2;
    }
    .sign-shop{
      width: 100%;
      padding: 2rem .5rem 0;
      font-size: .5rem;
      text-align: center;
    }
  }
}
.shop-tab-container{
  .flex(space-around);
  padding-top: .75rem;
  font-size: .75rem;
  .shop-tab{
    width: 100%;
    padding: 0.25rem 0;
    text-align: center;
  }
}
.shop-back-svg-container{
  position: fixed;
  z-index: 10;
  .widthHeight(100%, 100%);
  img{
    .widthHeight(100%, 100%);
  }
}
</style>