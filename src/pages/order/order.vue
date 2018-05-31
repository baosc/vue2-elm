<template>
  <div class="order-container">
    <head-top headTitle="订单">
    </head-top>
    <section>order</section>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import footerBottom from 'components/footer/footer';
export default {
  data() {
    return {}
  },
  components: { headTop, footerBottom },
}
</script>

<style lang="less" scoped>

</style>