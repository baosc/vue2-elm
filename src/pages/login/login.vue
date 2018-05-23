
<template>
  <div class="login-container">
    <headTop :head-title="loginWay? '登录':'密码登录'" go-back='true'>
    </headTop>
    <form class="login-form" v-if="loginWay" @submit.prevent>
      <section class="input-container phone_number">
        <input type="text" placeholder="手机号" maxlength="11" v-model="phoneNumber"/>
        <button @click.prevent="getVerifyCode" v-show="!computedTime"
        class="right-phone-number" >获取验证码</button>
        <button @click.prevent v-show="computedTime" 
        class="right-phone-number" >已发送({{computedTime}}s)</button>
      </section>
      <section class="input-container ">
        <input type="text" placeholder="验证码" maxlength="6" v-model="mobileCode"/>
      </section>
      <div class="login-mask">
        <span class="text">该功能尚未上线</span>
      </div>
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
    <div class="change_login" @click="changeLoginWay">
      <span>切换登录方式</span>
    </div>
    <div class="login-button">登录</div>
    <div class="to_forget"  v-if="!loginWay">
      <router-link to="/forget">
        <span>忘记密码？</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import { getcaptchas, checkExsis } from 'getData';
import { SUCCESSCODE } from 'config/mUtils';

const previewUrl = window.location.origin;
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

      phoneNumber:'', //手机号登录
      mobileCode: '', //手机验证码
      computedTime: 0,  //验证码重新获取计时
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
    },
    async getVerifyCode() {
      if(this.rightPhoneNumber){
        this.computedTime = 30;
        this.timer = setInterval(() => {
          this.computedTime -= 1;
          if(this.computedTime === 0) {
            clearInterval(this.timer);
          }
        }, 1000);
        let exsis = await checkExsis(this.phoneNumber, 'mobile');
        console.log(res + exsis );
      }
    }
  },
  computed: {
    //判断手机号码
    rightPhoneNumber: function (){
      return /^1\d{10}$/gi.test(this.phoneNumber)
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
  .phone_number{
    .left-phone-number{
      width: 100%;
    }
    .right-phone-number{
      width: 6rem;
      background: #fff;
      padding-top: 5px;
      padding-bottom: 5px;
      color: #0f7988;
    }
  }
}
.login-button{
  margin: .5rem .5rem .1rem;
  padding: .4rem 0;
  text-align: center;
  background: #48a8e9c2;
  .sizeColor(.8rem, @fc);
  border-radius: .2rem;
}
.change_login, .to_forget{
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: right;
  span{
    font-size: .6rem;
    color: orange;
    padding-right: 0.7rem;
  }
}
.login-mask{
  position: absolute;
  top: 2rem;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 50%;
  background: rgba(222,222,222,0.5);
  text-align: center;
  z-index: 100;
  .text{
    padding: 1rem;
    border-radius: .5rem;
    background: rgb(68, 68, 68, .8);
    color: #fff;
    font-size: .8rem;
  }
}
</style>