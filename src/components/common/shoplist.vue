<template>
  <div class="shoplist-container">
    <ul v-load-more="loadMore">
      <li v-for="item in shopListArr" :key="item.id" class="shop-li">
        <section>
					<img :src="imgBaseUrl + item.image_path" class="shop-img">
				</section>
        <hgroup class="shop-right">
          <header class="shop-detail-header">
            <h4 class="shop-title ellipsis">{{item.name}}</h4>
            <ul class="shop-supports">
              <li v-for="support in item.supports" :key="support.id" class="support">
                {{support.icon_name}}
              </li>
            </ul>
          </header>
          <h5 class="shop-rate">{{item.rating + '分'}}</h5>
          <h5 class="fee-distance">
            <span>{{item.float_minimum_order_amount}}起送</span>
            /
            <span>{{item.piecewise_agent_fee.tips}}</span>
          </h5>
        </hgroup>
      </li>
    </ul>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
  </div>
</template>

<script>
import loading from './loading';
import { loadMore } from 'components/common/mixin';
import { imgBaseUrl } from 'config/env';
import { shopList } from 'getData';
export default {
  name: 'shopList',
  mixins: [loadMore],
  data() {
    return {
      offset: 0, //分页加载数据列表，每次加载20个
      shopListArr: [], //店铺列表
      preventRepeatRequest: false, //防止重复加载数据
      showBackStatus: false, //显示返回顶部按钮
      showLoading: true, //显示加载动画
      touchend: false, //全部加载完，没有更多数据
      imgBaseUrl,
    }
  },
  components: { loading },
  created() {
  },
  mounted() {
    shopList().then((res) => {
      console.log(res);
      this.shopListArr = res;
    }).catch((err) => {
    });
  },
  methods: {
    loadMore() {
      console.log('loadMore')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixin.less';
.shop-list-container{
  background: #fff;
}
.shop-li{
  display: flex;
  padding: .7rem .4rem;
  border-bottom: .025rem solid #e4e4e4;
  .shop-img{
    display: block;
    .widthHeight(2.7rem, 2.7rem);
    margin-right: .4rem;
  }
  .shop-right{
    flex-grow: 1;
    .shop-detail-header{
      display: flex;
      justify-content: space-between;
      .shop-title{
        width: 8.5rem;
        .font(.65rem, .65rem);
        font-weight: 700;
      }
      .shop-supports{
        display: flex;
        .support{
          font-size: .3rem;
          margin-left: .2rem;
        }
      }
    }
    .shop-rate{
      font-size: .5rem;
      margin-top: .3rem;
    }
    .fee-distance{
      font-size: .5rem;
      margin-top: .3rem;
    }
  }
}


	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>