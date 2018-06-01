<template>
  <div class="shop-container">
    <section>
      <nav class="goback"></nav>
    </section>
    <loading v-show="showLoading"></loading>
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
      menuList: [], //商品列表
      showLoading: true, //显示加载动画
    }
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    this.shopId = 308690;
    //网页初始化时从本地缓存获取购物车数据
    this.INIT_BUYCART();
  },
  mounted() {
    console.log(this.axios);
    this.initData();
  },
  methods: {
    ...mapMutations(['INIT_BUYCART']),
    async initData() {
    }
  }
}
</script>

<style lang="less" scoped>

</style>