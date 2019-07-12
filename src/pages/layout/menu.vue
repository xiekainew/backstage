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
			<template v-for="(item) in menuList">
				<el-menu-item :index="item.path" :key="item.id" v-if="!item.children || !item.children.length">
					<i :class="item.icon" v-if="item.icon"></i>
					<span slot="title">{{item.title}}</span>
				</el-menu-item>
				<el-submenu :index="item.id" :key="item.id" v-else>
					<template slot="title">
						<i :class="item.icon"></i>
						<span>{{item.title}}</span>
					</template>

					<template v-for="(item1) in item.children">
						<el-menu-item :index="item1.path"  :key="item1.id"  v-if="!item1.children || !item1.children.length">
							<i :class="item1.icon" v-if="item1.icon"></i>
							<span slot="title">{{item1.title}}</span>
						</el-menu-item>
						<el-submenu :index="item1.id" :key="item1.id" v-else>
							<template slot="title">
								<i :class="item1.icon"></i>
								<span>{{item1.title}}</span>
							</template>
							<template v-for="(item2) in item1.children">
								<el-menu-item :index="item2.path"  :key="item2.id" v-if="!item2.children || !item2.children.length">
									<i :class="item2.icon" v-if="item2.icon"></i>
									<span slot="title">{{item2.title}}</span>
								</el-menu-item>
								<!-- <el-submenu :index="item2.id" v-else>
									<template slot="title">
										<i :class="item1.icon"></i>
										<span>{{item1.title}}</span>
									</template>
									<el-menu-item index="1-4-1">选项1</el-menu-item>
								</el-submenu> -->
							</template>
						</el-submenu>
					</template>
				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script type="text/javascript">
	import menuList from './menu.js'
	import Vuex from 'vuex'
	export default {
		data() {
			return {
				menuList
			}
		},
		computed: {
			...Vuex.mapState({
				isCollapse: state => state.isCollapse
			}),
			defaultActive() {
				return this.$route.path
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
