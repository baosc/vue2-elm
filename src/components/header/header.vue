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
      <div class="title_text ellipsis">{{headTitle}}</div>
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
  height: 1rem;
  line-height: 2.2rem;
  margin-left: .4rem;
}
.head_login{
  .centerTop;
  .sizeColor(0.65rem, #fff);
  right: .5rem;
  .login_span{
    color: #fff;
  }
}
.title_head{
  color: #fff;
  .center();
  width: 50%;
  text-align: center;
  .title_text{
    .sizeColor(.8rem, #fff);
    line-height: .8rem;    
  }
}
</style>