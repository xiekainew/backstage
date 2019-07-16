const menu = [{
	title: '首页',
	icon: 'el-icon-s-grid',
	path: '/dashboard',
	children: []
}, {
	title: '用户管理',
	icon: 'el-icon-user-solid',
	path: '/user',
	children: []
}, {
	title: '角色管理',
	icon: 'el-icon-star-on',
	children: [{
		title: '用户管理',
		icon: 'el-icon-user-solid',
		children: [{
			title: '用户管理2',
			icon: 'el-icon-user-solid',
			path: '/user2'
		}]
	}]
}, {
	title: '数据管理',
	icon: 'el-icon-s-marketing',
	path: '/database'
}, {
  title: '配置管理',
  icon: 'el-icon-s-tools',
  children: [{
    title: '菜单栏',
    path: '/menu',
    icon: 'el-icon-menu'
  }]
}]

export default menu
