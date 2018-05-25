<template>
  <div class="city-container">
    <headTop :head-title="cityname" go-back='true'>
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </headTop>
    <form class="form-city" @submit.prevent>
      <div>
        <input type="text" v-model="inputcity" class="input-style city-input" placeholder="输入学校、商务楼、地址"/>
      </div>
      <div>
        <button type="submit" class="city-submit" @click="submitPosition">提交</button>
      </div>
    </form>
    <header class="pos-search-history" v-if="historytitle">搜索历史</header>
    <ul class="getpos-ul">
      <li v-for="(place, index) in placelist" @click="nextPage(place)">
        <h4 class="pos-name ellipsis">{{place.name}}</h4>
        <p class="pos-address ellipsis">{{place.address}}</p>
      </li>
    </ul>
    <footer v-if="historytitle&&placelist.length" class="clear-all-history" @click="clearAll">清空历史记录</footer>
    <div v-if="placeNone" class="search-none-place">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import { currentCity, searchPlace } from 'getData';
import { getStore, setStore, removeStore } from 'config/mUtils';

export default {
  components: { headTop },
  data() {
    return {
      cityid: '',
      cityname: '',
      inputcity: '',
      placelist: [],  // 搜索结果
      placehistory: [], // 历史选择记录
      historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
      placeNone: false, // 搜索无结果，显示提示信息
    }
  },
  mounted() {
    this.cityid = this.$route.params.cityid;
    currentCity(this.cityid).then((result) => {
      this.cityname = result.name;
    });
    this.initData();
  },
  methods: {
    initData() {
      // 获取搜索历史记录
      if (getStore('placeHistory')) {
          this.placelist = JSON.parse(getStore('placeHistory'));
      }else{
          this.placelist = [];
      }
    },
    submitPosition() {
      if(this.inputcity){
        searchPlace(this.cityid, this.inputcity)
        .then((res) => {
          this.historytitle = false;
          this.placelist = res;
          this.placeNone = res.length ? false : true;
        }).catch((err) => {
        });
      }else {
        // alert('请输入地址');
      }
    },
    nextPage(choosePlace) {
      let history = getStore('placeHistory');
      let checkrepeat = false;
      if(history) {
        this.placehistory = JSON.parse(history);
        this.placehistory.map((val, index) => {
          if(val.geohash === choosePlace.geohash){
            checkrepeat = true;
            return true;
          }
        });
      }
      if(!checkrepeat) {
        this.placehistory.push(choosePlace);
      }
      setStore('placeHistory',this.placehistory);
      this.$router.push({
        path: '/msite',
        query: { geohash: choosePlace.geohash }
      });
    },
    clearAll() {
      removeStore('placeHistory');
      this.initData();
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin';
.city-container{
  padding-top: 2.35rem;
}
.change_city{
  .centerTop();
  right: .4rem;
  .sizeColor(.6rem, #fff);
}
.form-city{
  padding-top: .35rem;
  border: 1px solid @bc;
  background: #fff;
  div{
    width: 90%;
    text-align: center;
    margin: 0 auto;
    .city-input{
      width: 100%;
      .font(.5rem, 1.4rem);
      border: 1px solid #e4e4e4;
      text-indent: 0.3rem;
    }
    .city-submit{
      .font(.6rem, 1.4rem);
      .widthHeight(100%, 1.4rem);
      margin: .4rem 0;
      background: @blue;
      color: #fff;
    }
  }
}
.pos-search-history{
  .font(.5rem, 1rem);
  padding-left: .4rem;
}
.getpos-ul{
  background: #fff;
  li{
    border-bottom: 1px solid #e4e4e4;
  }
  .pos-name{
    width: 90%;
    margin: 0 auto;
    padding-top: 0.2rem;
    .font(.5rem, 1rem);
  }
  .pos-address{
    width: 90%;
    margin: 0rem auto 0.2rem;
    .font(.4rem, 1rem);
  }
}
.clear-all-history{
  .font(.6rem, 2rem);
  text-align: center;
  background: #fff;
}
</style>