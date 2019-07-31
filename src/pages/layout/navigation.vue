<template>
	<div class="navigation">
		<span class='icon' :class="[!isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="changeMenu"></span>
		<el-breadcrumb class="navigation-bread" separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
				{{item.title}}
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="navigation-right">
			<span class="navigation-right__name">{{userInfo.name}}</span>
			<el-dropdown @command="handleCommand">
				<span >
					<span class="navigation-right__header" :style="{backgroundImage:`url('${userInfo.avatar}')`}"
					></span>
					<!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="userinfo">修改头像</el-dropdown-item>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
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
				isCollapse: state => state.isCollapse,
				userInfo: state => state.userInfo
			}),
			breadList() {
				return this.$route.meta.bread || []
			}
		},
		mounted() {
			console.log(this.$route)
		},
		methods: {
			changeMenu() {
				this.$store.commit('updateCollapse', !this.isCollapse)
			},
			handleCommand(type) {
				switch (type) {
					case 'logout':
						this.$store.commit('updateToken', {})
						this.$router.push('/login')
						break
					case 'userinfo':
						this.$router.push('/header')
						break
				}
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
      	&-bread{
      		flex: 1;
      		margin-left: 16px;
      	}
      	&-right{
      		display: flex;
      		align-items: center;
      		&__name{
  			    font-weight: 400;
			    color: #606266;
			    margin-right: 10px;
      		}
			&__header{
				display: inline-block;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-color: #f2f2f2;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center center;
				cursor: pointer;
			}
      	}
	}
</style>
