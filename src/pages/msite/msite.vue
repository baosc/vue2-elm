<template>
  <div class="msite">
    <head-top signin-up='msite'>
      <router-link :to="'/search/geohash'" class="msite-search" slot="search">
	    	<i class="icon iconfont icon-search"></i>
    	</router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span class="title-text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <nav class="msite-nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food'}" v-for="foodItem in item" :key="foodItem.id" class="link-to-food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>  
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../assets/images/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>

    <div class="shop-list-container">
      <shop-list></shop-list>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import headTop from 'components/header/header';
import shopList from 'components/common/shoplist';
import footerBottom from 'components/footer/footer';
import { cityGuess, msiteAddress, msiteFoodType } from 'getData';
// import 'plugin/swiper/swiper-4.2.6.min.js';
import Swiper from 'swiper';
import 'plugin/swiper/swiper-4.2.6.min.css';
export default {
  data() {
    return {
      geohash: '', //city页面传递过来的地址geohash
      msiteTitle: '请选择地址...', //msite页面头部标题
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      foodTypes: [],  //食品分类列表
    }
  },
  components: { headTop, shopList, footerBottom },
  async beforeMount() {
    const geohash = this.$route.query.geohash;
    if(geohash) {
      this.geohash = geohash;
    } else {
      //不存在
      let res = await cityGuess();
      this.geohash = address.latitude + ',' + address.longitude;
    }
    //保存geohash到vuex
    this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    //记录当前经度纬度
    this.RECODE_ADDRESS(res);
    this.hasGetData = true;
  },
  mounted(){
    //获取导航食品类型列表
    msiteFoodType(this.geohash).then(res => {
      console.log(res);
      let resLength = res.length;
      let resArr = [...res]; // 返回一个新的数组
      let foodArr = [];
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        foodArr[j] = resArr.splice(0, 8);
      }
      this.foodTypes = foodArr;
    }).then(() => {
      //初始化swiper
      new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true
      });
    });

  },
  methods: {
    ...mapMutations(['SAVE_GEOHASH', 'RECODE_ADDRESS'])
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';
.msite-search{
  left: .8rem;
  .centerTop();
  .iconfont{
    .sizeColor(.9rem, #fff);
  }
}
.msite-title{
  .center();
  width: 50%;
  .title-text{
    display: block;
    .sizeColor(.8rem, #fff);
  }
}
.msite-nav{
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: .025rem solid #e4e4e4;
  height: 10.6rem;
  .swiper-container{
    padding-bottom: .6rem;
  }
  .swiper-slide{
    display: flex;
    flex-wrap: wrap;
    .link-to-food{
      display: flex;
      justify-content: center;
      width: 25%;
      padding: .3rem 0;
      text-align: center;
      img{
        width: 1.8rem;
        height: 1.8rem;
        margin-bottom: .3rem;
      }
      figcaption{
        font-size: .55rem;
      }
    }
  }

  .swiper-pagination{
    bottom: .1rem;
  }
}
</style>