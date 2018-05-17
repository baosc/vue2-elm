<template>
  <div>
    <headTop signin-up='home'>
      <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
    </headTop>
    <colorPicker ref="colorPicker" v-model="color" defaultColor="red" @change="handlerColorChange" 
      :showMoreColor="false"></colorPicker>
  </div>
</template>

<script>
import headTop from 'components/header/header';
import colorPicker from 'plugin/vue-color-picker/colorPicker';
import { cityGuess } from 'getData';
export default {
  data () {
    return {
      color: 'rgb(143, 140, 123)'
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
    }
  },
  mounted () {
    cityGuess().then((result) => {
    }).catch((err) => {
    });

    let res = {
      name: 'hh',
    };
    this.$store.state.userInfo = { ...res };
    console.log(this.$store.state.userInfo);
  }
}
</script>

<style lang="less" scoped>

</style>