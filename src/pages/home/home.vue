<template>
  <div>
    <headTop signin-up='home'>
      <span slot='logo' class="head-logo"  @click="reload">ele.me</span>
    </headTop>
    <!-- <colorPicker ref="colorPicker" v-model="color" defaultColor="red" @change="handlerColorChange" 
      :showMoreColor="false"></colorPicker> -->
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess-city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>

    <section class="hot-city-container">
      <h4 class="city-title">热门城市</h4>
      <ul class="city-list"></ul>
    </section>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import colorPicker from 'plugin/vue-color-picker/colorPicker';
import { cityGuess, hotCity } from 'getData';
export default {
  data () {
    return {
      color: 'rgb(143, 140, 123)',
      guessCity: '',//当前城市
      guessCityid: '',//当前城市id
      hotCity: [], //热门城市
      groupCity: {} , //所有城市列表
    }
  },
  components: { colorPicker, headTop },
  methods: {
    handlerColorChange(color) {
      color = this.$refs.colorPicker.hexToRgb(color);
      color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      this.color = color;
    },
    //点击图标刷新页面
    reload(){
        window.location.reload();
    },
    async getHotCity() {
      let hc = await hotCity();
      console.log(hc);
      this.hotCity = hc;
    }
  },
  mounted () {
    cityGuess().then((result) => {
      this.guessCity = result.name;
      this.guessCityid = result.id;
    }).catch((err) => {
    });
    this.getHotCity();
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';
.head-logo {
  .centerTop;
  .sizeColor(.8rem, #fff);
  left: 0.5rem;
}
.city-nav {
    padding-top: 2.35rem;
    border: 1px solid #e4e4e4;
    background: #fff;
    margin-bottom: 0.4rem;
    .city-tip{
      display: flex;
      justify-content: space-between;
      line-height: 1.45rem;
      padding: 0 0.45rem;
      span{
        &:first-of-type{
          font-size: .55rem;
          color: #666;
        }
        &:nth-of-type(2){
          font-weight: 900;
          font-size: .475rem;
          color: #9f9f9f;
        }
      }
    }
    .guess-city{
      .flex();
      .font(.7rem, 1.8rem);
      align-items: center;
      padding: 0 0.45rem;
      span {
        &:first-of-type{
          color: #3190e8;
        }
      }
      .arrow_right{
        .widthHeight(.6rem, .6rem);
        fill: #999;
      }
    }
}
</style>