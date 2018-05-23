<template>
  <div class="msite">
    <head-top></head-top>
    <nav class="msite-nav"></nav>
    <div class="shop-list-container">
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import footerBottom from 'components/footer/footer';
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
}
</script>

<style lang="less" scoped>

</style>