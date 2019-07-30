<template>
	<div>
		<el-menu
		class="el-menu-vertical-demo"
		background-color="rgb(48, 65, 86)"
		text-color="rgb(191, 203, 217)"
		:collapse="isCollapse"
		router
		:default-active="defaultActive"
		active-text-color="rgb(64, 158, 255)">
			<template v-for="(item, index) in menuList">
				<el-menu-item :index="item.path" :key="index + ''" v-if="!item.children || !item.children.length">
					<i :class="item.icon" v-if="item.icon"></i>
					<span slot="title">{{item.title}}</span>
				</el-menu-item>
				<el-submenu :index="index + ''" :key="index + ''" v-else>
					<template slot="title">
						<i :class="item.icon"></i>
						<span>{{item.title}}</span>
					</template>

					<template v-for="(item1, index1) in item.children">
						<el-menu-item :index="item1.path"  :key="index + '' + index1"  v-if="!item1.children || !item1.children.length">
							<i :class="item1.icon" v-if="item1.icon"></i>
							<span slot="title">{{item1.title}}</span>
						</el-menu-item>
						<el-submenu :index="index + '' + index1" :key="index + '' + index1" v-else>
							<template slot="title">
								<i :class="item1.icon"></i>
								<span>{{item1.title}}</span>
							</template>
							<template v-for="(item2, index2) in item1.children">
								<el-menu-item :index="item2.path"  :key="index + '' + index1 + '' + index2" v-if="!item2.children || !item2.children.length">
									<i :class="item2.icon" v-if="item2.icon"></i>
									<span slot="title">{{item2.title}}</span>
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script type="text/javascript">
	import Vuex from 'vuex'
  import {
    getMenuList
  } from '@/api/common.js'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...Vuex.mapState({
				isCollapse: state => state.isCollapse,
                menuList: state => state.menuList
			}),
			defaultActive() {
				return this.$route.meta.activePath || this.$route.path
			}
		},
		mounted() {
			console.log(this.$route)
		},
		methods: {

		}
	}
</script>
<style lang="scss">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
    	width: 200px;
    	min-height: 400px;
  	}
	.el-submenu__title:hover{
		background: #263445 !important;
	}
	.el-menu-item:hover{
		background: #263445 !important;
	}
	.el-submenu{
		.el-menu-item{
			// background: #1f2d3d !important;
		}
	}
</style>
