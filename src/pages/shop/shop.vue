<template>
  <div>
    <div class="shop-container" v-show="!showLoading">
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
        <div class="shop-tab" 
          :class="{'active-tab': showType == showTypeList[0]}" 
          @click="showType = showTypeList[0]">
          <span>点餐</span>
        </div>
        <div class="shop-tab" 
          :class="{'active-tab': showType == showTypeList[1]}" 
          @click="showType = showTypeList[1]">
          <span>评价</span>
        </div>
        <div class="shop-tab" 
          :class="{'active-tab': showType == showTypeList[2]}" 
          @click="showType = showTypeList[2]">
          <span>商家</span>
        </div>
      </section>

      <transition name="fade-choose">
        <section class="food-container" v-show="showType == showTypeList[0]">
          <section class="menu-container" :style="foodConHeight">
            <ul class="menu-nav">
              <li v-for="(item, index) in menuList" :key="index" role="button">
                <img v-if="item.icon_url" />
                <span>{{item.name}}</span>
              </li>
            </ul>
            <section class="menu-list">
              <dl v-for="(item, index) in menuList" :key="index" role="button">
                <dt role="heading">
                  <div class="category-title">
                    <strong class="category-name">{{item.name}}</strong>
                    <span class="category-desc">{{item.description}}</span>
                  </div>
                </dt>
                <dd v-for="(food, index) in item.foods" role="menuitem">
                  <div class="fooddetail">
                    <span class="fooddetail-logo">
                      <img :src="getFoodLogo(food.image_path)"/>
                    </span>
                    <section class="fooddetail-info">
                      <p class="fooddetail-name ellipsis">{{food.name}}</p>
                      <p class="fooddetail-desc ellipsis">{{food.description}}</p>
                      <p class="fooddetail-sales ellipsis">
                        <span>月售{{food.month_sales}}份</span>
                        <span>好评率{{food.satisfy_rate}} %</span>
                      </p>
                      <div class="fooddetail-activity-row"></div>
                      <strong class="fooddetail-price">
                        <span class="price">¥ {{food.specfoods[0].price}}</span>
                        <del class="original-price" v-if="food.specfoods[0].original_price">
                          ¥ {{food.specfoods[0].original_price}}
                        </del>
                      </strong>
                      <div class="fooddetail-button"></div>
                    </section>
                  </div>
                </dd>
              </dl>
            </section>
          </section>
          <section class="buy-cart-container">
            购物车
          </section>
        </section>
      </transition>
      
      <transition name="fade-choose">
        <section class="rating-container" v-show="showType == showTypeList[1]">
2
        </section>
      </transition>
      
      <transition name="fade-choose">
        <section class="info-container" v-show="showType == showTypeList[2]">
3
        </section>
      </transition>
    </div>
    <loading class="shop-loading" v-show="showLoading"></loading>
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
      showTypeList: ['food', 'rating', 'business'],
      showType: 'food', //展示类型： 点餐、评价、商家
    }
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    //网页初始化时从本地缓存获取购物车数据
    this.INIT_BUYCART();
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    setTimeout(() => {
      this.initData();
    }, 1000);
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
      this.showLoading = false;
    },
    getFoodLogo(id) {
      let url = this.handlerImagePath(id);
      return url + '?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'
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
    },
    foodConHeight() {
      const h = this.windowHeight - 30 - 50;
      return {
        height: h + 'px'
      }
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
    &.active-tab{
      span{
        position: relative;
        &:after{
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: .08rem;
          bottom: -.3rem;
          background-color: red;
        }
      }
    }
  }
}

.menu-container{
  display: flex;
  .menu-nav{
    flex: none;
    width: 3rem;
    font-size: .55rem;
    text-align: center;
    li{
      padding: .4rem .2rem;
    }
  }
  .menu-list{
    flex: auto;
    overflow: hidden;
    overflow-y: auto;
    .category-title{
      display: flex;
      padding: .5rem 1.4rem .5rem .5rem;
      border-bottom: 1px solid #e4e4e4;
      .category-name{
        font-size: .45rem;
        flex: none;
      }
      .category-desc{
        flex: auto;
        font-size: .45rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .fooddetail{
      display: flex;
      padding: .5rem;
      .fooddetail-logo{
        flex: none;
        width: 3rem;
        height: 3rem;
        margin-right: .45rem;
        img{
          width: 100%;
        }
      }
      .fooddetail-info{
        flex: auto;
        .fooddetail-name{
          font-size: 0.6rem;
          font-weight: 700;
        }
        .fooddetail-desc{
          font-size: 0.45rem;
          width: 7.5rem;
          padding-top: .1rem;
        }
        .fooddetail-sales{
          font-size: 0.5rem;
          width: 7.5rem;
          padding-top: .1rem;
        }
        .fooddetail-price{
          .price{
            font-size: .55rem;
            color: #f60;
          }
          .original-price{
            font-size: .45rem;
          }
        }
      }
    }
  }
}

.buy-cart-container{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
}


.shop-loading{
  z-index: 11;
}
.shop-back-svg-container{
  position: fixed;
  z-index: 10;
  .widthHeight(100%, 100%);
  img{
    .widthHeight(100%, 100%);
  }
}
.fade-choose-enter-active, .fade-choose-leave-active {
    transition: opacity .5s;
}
.fade-choose-leave, .fade-choose-leave-active {
    display: none;
}
.fade-choose-enter, .fade-choose-leave-active {
    opacity: 0;
}
</style>