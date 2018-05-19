
<template>
  <div class="login-container">
    <headTop :head-title="loginWay? '登录':'密码登录'" go-back='true'>
    </headTop>
    <form class="login-form" v-if="loginWay" @submit.prevent>
      <section class="input-container phone_number">
        <input type="text" placeholder="手机号" maxlength="11" v-model="phoneNumber"/>
      </section>
    </form>
    <form class="login-form" v-else @submit.prevent>
      <section class="input-container">
        <input type="text" placeholder="账号" v-model.lazy="userAccount"/>
      </section>
      <section class="input-container">
        <input v-if="!showPassword" type="password" v-model="password" placeholder="密码"/>
        <input v-else type="text" v-model="password" placeholder="密码"/>
        <div class="button-switch" @click="changePasswordType"
          :class="{'change-to-text': showPassword, 'trans-to-right': !showPassword}">
          <div class="circle-button"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input-container">
        <input type="text" maxlength="4" v-model="codeNumber" placeholder="验证码"/>
        <div class="code-img-container" @click="getCaptchaCode">
          <img v-show="codeImg" :src="codeImg"/>
          <div class="change-img">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="login-button">登录</div>
    <div class="change_login" @click="changeLoginWay">切换登录方式</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import { getcaptchas } from 'getData';
import { SUCCESSCODE } from 'config/mUtils';
export default {
  components: { headTop },
  data() {
    return {
      loginWay: false, //登录方式，默认短信登录
      userAccount: '', //登录账户
      password: '', //密码
      codeNumber: '',  //验证码
      codeImg: '', //验证码图片
      showPassword: false,
    }
  },
  created() {
    this.getCaptchaCode();
  },
  mounted() {

  },
  methods: {
    async getCaptchaCode() {
      let res = await getcaptchas();
      if(res && res.status === SUCCESSCODE){
        this.codeImg = res.code;
      }
    },
    changeLoginWay() {
      this.loginWay = !this.loginWay;
    },
    changePasswordType() {
      this.showPassword = !this.showPassword;
    }
  },

  watch: {
    userAccount(nVal, oVal) {
      console.log(nVal)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';
.login-form{
  padding-top: 2.35rem;
  .input-container{
    .flex();
    background: #fff;
    padding: .4rem .6rem;
    border-bottom: 1px solid #e4e4e4;
  }
  .button-switch{
    position: relative;
    .flex();
    .widthHeight(2rem, 0.9rem);
    align-items: center;
    background: #e4e4e4;
    border-radius: .9rem;
    .circle-button{
      position: absolute;
      .widthHeight(1.2rem, 1.2rem);
      border-radius: 100%;
      transition: all 0.5s;
      background-color: #ccc;
      z-index: 2;
    }

    &.trans-to-right{ 
      .circle-button{
        left: 0;
      }
    }
    &.change-to-text{ 
      background: #4cd964;
      .circle-button{
        transform: translateX(1rem);
      }
    }
    span{
      .sizeColor(.6rem, #fff);
    }
    span:nth-last-child(1){
      margin-right: 0.4rem;
      transform: translateY(-.1rem);
    }
  }
  .code-img-container{
    .flex();
    .change-img{
      .flex();
      flex-direction: column;
      width: 2rem;
      text-align: center;
      p{
        .font(.6rem, .6rem);
        &:nth-last-child(1) {
          color: #4cd964;
        }
      }
    }
  }
}
.login-button{
  margin: .5rem .5rem 1rem;
  padding: .4rem 0;
  text-align: center;
  background: #48a8e9c2;
  .sizeColor(.8rem, @fc);
  border-radius: .2rem;
}
</style>