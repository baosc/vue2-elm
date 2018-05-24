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
    <nav class="msite-nav"></nav>
    <div class="shop-list-container">
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import headTop from 'components/header/header';
import footerBottom from 'components/footer/footer';
import { cityGuess, msiteAddress } from 'getData';
export default {
  data() {
    return {
      geohash: '', //city页面传递过来的地址geohash
      msiteTitle: '请选择地址...', // msite页面头部标题
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
    }
  },
  components: { headTop,footerBottom },
  async beforeMount() {
    const geohash = this.$route.query.geohash;
    if(geohash) {
      this.geohash = geohash;
    } else {
      //不存在
      let res = await cityGuess();
      this.geohash = address.latitude + ',' + address.longitude;
    }
    //保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    //记录当前经度纬度
    this.RECODE_ADDRESS(res);
    this.hasGetData = true;
  },
  mounted(){
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
</style>