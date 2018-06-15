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
      <section>
        <nav class="shop-tab-container" ref="shopTabContainer">
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
        </nav>
        <div>
          <!-- 点餐 -->
          <transition name="fade-choose">
            <section class="food-container" v-show="showType == showTypeList[0]">
              <!-- 菜单 -->
              <section class="menu-container">
                <section class="menu-nav menu-left" ref="wrapperMenu">
                  <ul>
                    <li v-for="(item, index) in menuList" :key="index" role="button">
                      <img v-if="item.icon_url" />
                      <span>{{item.name}}</span>
                    </li>
                    <li v-for="(item, index) in menuList" :key="index + '2'" role="button">
                      <img v-if="item.icon_url" />
                      <span>{{item.name}}</span>
                    </li>
                  </ul>
                </section>
                <section class="menu-list menu-right" ref="menuFoodList">
                  <ul>
                    <li v-for="(item, index) in menuList" :key="index" role="button">
                      <header>
                        <div class="category-title">
                          <strong class="category-name">{{item.name}}</strong>
                          <span class="category-desc">{{item.description}}</span>
                        </div>
                      </header>
                      <section  v-for="(food, index) in item.foods" :key="index" role="menuitem">
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
                            <div class="fooddetail-activity-row" v-if="food.activity">
                              <span class="food-activity">
                                <span class="food-rateGhost">5折</span>
                                <span class="food-rateTextGhost">{{food.activity.applicable_quantity_text}}</span>
                              </span>
                            </div>
                            <strong class="fooddetail-price">
                              <span class="price">¥ {{food.specfoods[0].price}}</span>
                              <del class="original-price" v-if="food.specfoods[0].original_price">
                                ¥ {{food.specfoods[0].original_price}}
                              </del>
                              <span v-else-if="food.specifications.length">起</span>
                            </strong>
                            <footer>
                              <div class="fooddetail-choose">
                                <span class="reduce-icon iconfont icon-reduce"></span>
                                <span class="total-icon">2</span>
                                <span class="standard-icon iconfont" v-if="food.specifications.length">选规格</span>
                                <span class="add-icon iconfont icon-add" v-else @click="addToCart(food)"></span>
                              </div>
                            </footer>
                          </section>
                        </div>
                      </section>
                    </li>
                  </ul>
                </section>
              </section>
              <!-- 购物车 -->
              <section ref="buyCartContainer" class="buy-cart-container">
                <span role="button" class="cart-icon iconfont icon-gouwuche" @click="toggleCartList"></span>
                <div role="button" class="cart-info"  @click="toggleCartList">
                  <p class="cart-total">
                    <span>¥0</span>
                  </p>
                  <p class="cart-delivery">配送费¥6</p>
                </div>
                <div class="cart-gotopay"  @click="goPay">
                  <span>20元起送</span>
                  <small></small>
                </div>
              </section>
              <!-- 已选列表 -->
              <transition name="toggle-cart">
                <section class="cart-food-list" v-show="showCartList && cartFoodList.length">
                  <header>
                    <span class="title">已选商品</span>
                    <div class="clear-cart" @click="clearCart">
                      <i class="iconfont icon-qingchu"></i>
                      <span>清空</span>
                    </div>
                  </header>
                  <section class="entityList-cartbody-scroller">
                    <ul>
                      <li v-for="(food, index) in cartFoodList" :key="index" class="entityList-row">
                        <span class="entityList-name">{{food.name}}</span>
                        <span class="entityList-total">10</span>
                        <span class="entityList-buttom">- 1 +</span>
                      </li>
                    </ul>
                    <div class="packingfee">11</div>
                  </section>
                </section>
              </transition>
              <!-- 遮罩 -->
              <transition name="fade">
                <div class="screen-mask" v-show="showCartList && cartFoodList.length"></div>
              </transition>
            </section>
          </transition>
          <!-- 评价 -->
          <transition name="fade-choose">
            <section class="rating-container" v-show="showType == showTypeList[1]">
              2
            </section>
          </transition>
          <!-- 商家 -->
          <transition name="fade-choose">
            <section class="info-container" v-show="showType == showTypeList[2]">
              3
            </section>
          </transition>
        </div>
      </section>
    </div>
    <loading class="shop-loading" v-show="showLoading"></loading>
    <section class="shop-back-svg-container" v-if="showLoading">
      <img src="../../assets/images/shop_back_svg.svg">
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import loading from 'components/common/loading';
import BScroll from 'better-scroll'
import Scroll from 'components/base/scroll';
const baseImgUrl = 'https://fuss10.elemecdn.com/';
export default {
  components: { loading, Scroll },
  data() {
    return {
      geohash: '',
      shopId: 0,
      shopDetails: {},
      menuList: [], //商品列表
      shopListTop: [], //商品列表的高度集合
      shopDiscuss: {},//评价
      showLoading: true, //显示加载动画
      windowHeight: null, //屏幕高度
      showTypeList: ['food', 'rating', 'business'],
      showType: 'food', //展示类型： 点餐、评价、商家
      listenScroll: true,
      probeType: 2,

      //购物车
      cartFoodList: [ ],   //已选列表
      showCartList: false,  //显示？已选列表
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
    ...mapMutations(['INIT_BUYCART', 'ADD_CART']),
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
    },
    /**
     * 初始化和shopCart变化时，赋值 categoryNum，totalPrice，cartFoodList
     * 整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理
     * 包括购物车组件中自身的商品数量，使整个数据流更加清晰
     */
    initCategoryNum() {
      this.cartFoodList = [];
      this.menuList.forEach((item, index) => {

      });
    },
     //获取食品列表的高度，存入shopListTop
    initFoodListHeight() {
      const listContainer = this.$refs.menuFoodList;
      const listArr = Array.from(listContainer.children[0].children);
      listArr.forEach((item, index) => {
        this.shopListTop[index] = item.offsetTop;
      });
      this.listenMenuListScroll(listContainer);
    },
    //滑动商品列表时，监听对应的ScrollTop来设置对应的标题样式
    listenMenuListScroll(element) {
      //先确定wrap的高度
      const h = window.innerHeight - this.$refs.shopTabContainer.clientHeight
        - this.$refs.buyCartContainer.clientHeight;
        this.$refs.menuFoodList.style.height = h + 'px';
        this.$refs.wrapperMenu.style.height = h + 'px';
      this.foodScroll = new BScroll(element, {
        probeType: 3,
        deceleration: 0.001,
        bounce: false,
        swipeTime: 2000,
        click: true,
      });
      const wrapperMenu = new BScroll(this.$refs.wrapperMenu , {
        click: true,
      });

      const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
      this.foodScroll.on('scroll', (pos) => {
        console.log(pos);
        if (!this.$refs.wrapperMenu) {
          return;
        }
        this.shopListTop.forEach((item, index) => {
          if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            this.menuIndex = index;
            const menuList=this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
            const el = menuList[0];
            wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
          }
        });
      });
    },
    toggleCartList() {
      this.showCartList = this.cartFoodList.length ? !this.showCartList : false;
    },
    // 加入购物车，商铺id,食品分类id,食品id,食品规格id,食品名字,价格,规格
    addToCart(item) {
      this.ADD_CART(Object.assign({}, {shopid: this.shopId}, item));
    },
    goPay() {

    },
    clearCart() {

    },
  },
  computed: {
    ...mapState([
      'latitude','longitude','cartList'
    ]),
    // 当前商店的购物信息
    shopCart() {
      return {...this.cartList[this.shopId]};
    },
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
  },
  watch: {
    showLoading(nVal) {
      if(!nVal) {
        this.$nextTick(() => {
          this.initFoodListHeight();
          this.initCategoryNum();
        });
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
  padding-bottom: .75rem;
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
  margin-bottom: 3rem;
  .menu-nav{
    flex: none;
    width: 3rem;
    font-size: .55rem;
    text-align: center;
    overflow: hidden;
    overflow-y: auto;
    li{
      padding: .6rem .2rem;
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
        .fooddetail-activity-row{
          padding-top: .1rem;
          font-size: .3rem;
          .food-rateGhost{
            padding: 0 .2rem;
            color: #fff;
            background-image: linear-gradient(90deg, #ff7416, #ff3c15)
          }
          .food-rateTextGhost{
            color: #f07373;
            border: 1px solid #ff3c15;
            border-left: none;
          }
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
        .fooddetail-choose{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          span{
            margin-right: 8px;
            font-size: 1rem;
          }
          .reduce-icon{
            color: #d9d9d9;
          }
          .total-icon{
            font-size: .6rem;
          }
          .standard-icon{
            font-size: .5rem;
            background: #3199e9;
            color: #fff;
            padding: .1rem .2rem;
            border-radius: 0.4rem;
          }
          .add-icon{
            color: #3199e9;
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
  height: 2rem;
  display: flex;
  flex-wrap: nowrap;
  background: rgba(61,61,63,.9);
  z-index: 11;
  .cart-icon{
    position: absolute;
    top: -.5rem;
    left: .5rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background-image: radial-gradient(circle, #363636 .9rem, #444 0);
    &::before{
      .center();
      .sizeColor(.8rem, #afafaf);
    }
  }
  .cart-info{
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3.6rem;
    .cart-total{
      .sizeColor(.8rem, #fff);
      span{
        .sizeColor(.8rem, #fff);
      }
    }
    .cart-delivery{
      flex: 1;
      .sizeColor(.5rem, #999);
    }
  }
  .cart-gotopay{
    flex: none;
    width: 4.5rem;
    .font(.65rem, 2rem);
    span{
      color: #fff;
    }
  }
}
.cart-food-list{
  position: fixed;
  bottom: 2rem;
  width: 100%;
  background: #fff;
  z-index: 10;
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    padding: 0 .5rem;
    font-size: .65rem;
    background-color: #eceff1;
    border-bottom: 1px solid #eceff1;
    .title{
      border-left: 3px solid #2395ff;
      padding-left: .3rem;
    }
    .cart-list{

    }
  }
  .entityList-cartbody-scroller{
    padding-bottom: 1.2rem;
    ul{
      margin-bottom: 1.5rem;
      li.entityList-row{
        display: flex;
        padding: .5rem .3rem;
        .entityList-name{
          flex: 5.5;
        }
         .entityList-total{
          flex: 2.5;
          text-align: right;
        }
         .entityList-button{
          flex: 3;
          text-align: right;
        }
      }
    }
  }
}
.screen-mask{
  position: fixed;
  z-index: 9;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: rgba(1, 1, 1, 0.7);
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

.toggle-cart-enter-active, .toggle-cart-leave-active{
  transition: all .3s ease-in;
}
.toggle-cart-enter, .toggle-cart-leave-active {
    transform: translateY(100%);
}
</style>