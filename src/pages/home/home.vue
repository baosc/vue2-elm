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
      <ul class="city-list clear">
        <router-link tag="li" v-for="(city, index) in hotCity" :key="'hot-city-' + index"
          :to="'/city/' + city.id">
          {{city.name}}
        </router-link>
      </ul>
    </section>

    <section class="group-city-container">
      <ul>
        <li v-for="(letterCity, key, index) in ordergroupCity" :key="'group' + key"
           class="letter-group-city">
          <h4 class="letter-group-title">{{key}}</h4>
          <ul class="letter-cities clear">
            <router-link tag="li" v-for="(city, index) in letterCity" :key="index"
              :to="'/city/' + city.id" class="letter-city ellipsis">
              {{city.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
    <aside class="letter-guide">
      <ul>
        <li v-for="(letter, index) in letterArr" :key="index">
          {{letter}}
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import colorPicker from 'plugin/vue-color-picker/colorPicker';
import { cityGuess, hotCity, groupCity } from 'getData';
import { setStore, getStore } from 'config/mUtils';
export default {
  data () {
    return {
      color: 'rgb(143, 140, 123)',
      guessCity: '',//当前城市
      guessCityid: '',//当前城市id
      hotCity: [], //热门城市
      groupCity: {} , //所有城市列表
      letterArr: [],
    }
  },
  components: { colorPicker, headTop },
  mounted () {
    //定位城市
    cityGuess().then((result) => {
      this.guessCity = result.name;
      this.guessCityid = result.id;
    }).catch((err) => {
    });
    //获取热门城市
    this.getHotCity();
    //获取所有城市
    let gcJSON = getStore('groupCity');
    if(!gcJSON){
      groupCity().then((result) => {
        this.groupCity = result;
        setStore('groupCity', this.groupCity);
        let keys = Object.keys(this.groupCity);
      }).catch((err) => {
      });
    } else {
      this.groupCity = JSON.parse(gcJSON);
    }
    //生成a-z数组
    let arr = [];
    for (let i = 0; i < 26; i++) {
      arr.push(String.fromCharCode(65+i));
    }
    this.letterArr = arr;
  },
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
      this.hotCity = hc;
    },
  },
  computed: {
    ordergroupCity() {
      let sortobj = {};
      for (let i = 65; i < 90; i++) {
        const key = String.fromCharCode(i);
        if (this.groupCity[key]) {
          sortobj[key] = this.groupCity[key];
        }
      }
      return sortobj;
    }
  },
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
    .flex();
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span{
      &:first-of-type{
        font-size: 0.55rem;
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
    height: 1.8rem;
    border-bottom: 2px solid @bc;
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
.hot-city-container{
  background: #fff;
  margin-bottom: 0.4rem;
  .city-title{
    padding: 0 0.45rem;
    .font(0.6rem, 1.45rem, Helvetica Neue);
    border-top: 2px solid @bc;
  }
  .city-list{
    border-bottom: 2px solid #e4e4e4;
    li{
      float: left;
      width: 25%;
      height: 1.75rem;
      .sizeColor(0.6rem, @blue);
      .font(0.6rem, 1.75rem);
      text-align: center;
      border-top: 1px solid @bc;
      border-right: 1px solid @bc;
    }
  }
}
.group-city-container {
  background: #fff;
  margin-bottom: 0.4rem;
  .letter-group-city{
    // margin-bottom: .4rem;
    .letter-group-title{
      position: sticky;
      top: 1.95rem;
      z-index: 99;
      .font(.55rem, 1.45rem);
      text-indent: .45rem;
      border-top: 1px solid @bc;
      border-bottom: 1px solid @bc;
      background: @bc;
    }
    .letter-cities{
      border-bottom: 2px solid @bc;
      .letter-city{
        float: left;
        width: 25%;
        .font(.6rem, 1.75rem);
        color: #666;
        text-align: center;
        border-bottom: 1px solid @bc;
        border-right: 1px solid @bc;
      }
    }
  }
}
.letter-guide {
  position: fixed;
  top: 50%;
  right: .1rem;
  transform: translateY(-50%);
  z-index: 100;
  font-size: .5rem;
  text-align: center;
}
</style>