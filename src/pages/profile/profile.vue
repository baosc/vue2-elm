<template>
  <div class="profile-container">
    <head-top headTitle="我的">
    </head-top>
    <section>profile</section>
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
  created(){
    alert('created')
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
}
</script>

<style lang="less" scoped>

</style>