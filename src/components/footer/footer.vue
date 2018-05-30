<template>
  <div class="footer-guide">
    <router-link :to="link" v-for="link in guides" 
      :replace="true" :class="{'guide-active': link.path == activePath}" class="guide">
      <i class="icon iconfont guide-icon" :class="link.icon"></i>
      <span class="guide-title">{{link.title}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guides: [
        { path:'msite', query: { plan: 'private' }, title: '首页', icon: 'icon-home' },
        { path:'discover', params: { userId: 123 }, title: '发现', icon: 'icon-discover' },
        { path:'order', title: '订单', icon: 'icon-order' },
        { path:'profile', title: '我的', icon: 'icon-me' },
      ],
    }
  },
  computed: {
    activePath() {
      const path = this.$route.path;
      let currentPath;
      this.guides.every((val, index) => {
        if (path.indexOf(val.path) > -1) {
          currentPath = val.path;
          return false;
        }
        return true;
      });
      return currentPath;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';
.footer-guide{
  position: fixed;
  height: 1.95rem;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: .3rem;
  z-index: 100;
  background: #fff;
  .guide{
    display: flex;
    flex-direction: column;
    align-items: center;
    .guide-icon{
      .sizeColor(.7rem, #8e8e93); 
    }
    .guide-title{
      .sizeColor(.5rem, #8e8e93);
    }

    &.guide-active{
      .guide-icon,
      .guide-title{
        color: #0085ff;
      }
    }
  }
}
</style>