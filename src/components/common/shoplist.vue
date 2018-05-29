<template>
  <div>
    shopList
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
  </div>
</template>

<script>
import loading from './loading'

export default {
  name: 'shopList',
  data() {
    return {
      showLoading: true,
    }
  },
  components: { loading },
  created() {
  },
  mounted() {},
  methods: {
  }
}
</script>

<style lang="less" scoped>
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>