<template>
  <div class="shop-container">
    <section>
      <nav class="goback"></nav>
    </section>
    <loading v-show="showLoading"></loading>
    <section class="shop-back-svg-container" v-if="showLoading">
      <img src="../../assets/images/shop_back_svg.svg">
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import loading from 'components/common/loading';
export default {
  components: { loading },
  data() {
    return {
      geohash: '',
      shopId: 0,
      shopDetails: {},
      menuList: [], //商品列表
      showLoading: true, //显示加载动画
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
      this.menuList == shopMenu.data;
      this.shopDetails = restaurant.data;
      console.log(this.menuList);
      console.log(this.shopDetails);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';
.shop-back-svg-container{
  position: fixed;
  .widthHeight(100%, 100%);
  img{
    .widthHeight(100%, 100%);
  }
}
</style>