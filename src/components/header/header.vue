<template>
  <header id="head_top">
    <slot name='logo'></slot>
    <slot name='search'></slot>
    <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <router-link class="head_login" :to="userInfo? '/profile':'/login'" v-if='signinUp'>
      <svg class="user_avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login_span" v-else>登录|注册</span>
    </router-link>
    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script>
import {mapState, mapActions } from 'vuex';
export default {
  data () {
    return { }
  },
  mounted () {
    //获取用户信息
    this.getUserInfo();
  },
  props: ['signinUp', 'headTitle', 'goBack'],
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['getUserInfo'])
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';

#head_top{
  position: fixed;
  left: 0;
  top: 0;
  .widthHeight(100%, 1.95rem);
  z-index: 100;
  background-color: #3190e8;
}
.head_goback{
}
.head_login{
  .centerTop;
  right: .5rem;
  .login_span{
    .sizeColor(.8rem, #fff);
  }
}
.title_head{
}
</style>