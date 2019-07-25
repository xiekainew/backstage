<template>
	<div class="navigation">
		<span class='icon' :class="[!isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="changeMenu"></span>

	</div>
</template>

<script type="text/javascript">
	import Vuex from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...Vuex.mapState({
				isCollapse: state => state.isCollapse
			})
		},
		mounted() {
		},
		methods: {
			changeMenu() {
				this.$store.commit('updateCollapse', !this.isCollapse)
			}
		}
	}
</script>
<style lang='scss'>
	.navigation{
		height: 50px;
      	background: white;
      	box-shadow: 0 1px 4px rgba(0,21,41,0.08);
      	display: flex;
      	align-items: center;
      	padding: 0 15px;
      	.icon{
      		font-size: 25px;
    		color: #666;
    		cursor: pointer;
      	}
	}
</style>