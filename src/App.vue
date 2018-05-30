<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import 'plugin/ipv4/ipv4';
import svgIcon from 'components/common/svg';
export default {
  name: 'App',
  components: {
    svgIcon
  },
  created() {

  },
  mounted(){
    setTimeout(() => {
      this.createQRcode();
    }, 2000);
  },
  methods: {
    createQRcode() {
      //设置手机快速访问二维码
      const previewClassName = 'logo_qrcode';
      const preview = document.getElementsByClassName(previewClassName);
      if (!preview.length && window.ipv4) {
        const previewUrl = `http://${window.ipv4}:8080`;
        console.log(previewUrl);
        QRCode.toDataURL(previewUrl)
        .then(url => {
          let img = document.createElement('img');
          img.src = url;
          img.className = previewClassName;
          document.body.appendChild(img);
        })
        .catch(err => {
          console.error(err)
        });
      }
    }
  }
}
</script>

<style lang="less">
  @import './assets/style/common.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
  }
  .logo_qrcode {
    position: fixed;
    bottom: 5rem;
    right: 0;
  }
</style>