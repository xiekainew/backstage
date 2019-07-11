const menu = [{
	title: '首页',
	icon: 'el-icon-s-grid',
	path: '/',
	id: 1,
	children: []
}, {
	title: '用户管理',
	icon: 'el-icon-user-solid',
	path: '/user',
	id: 2,
	children: []
}, {
	title: '角色管理',
	icon: 'el-icon-star-on',
	path: '/user',
	id: 3,
	children: [{
		title: '用户管理',
		icon: 'el-icon-user-solid',
		path: '/user',
		id: 31,
		children: [{
			title: '用户管理2',
			icon: 'el-icon-user-solid',
			path: '/user',
			id: 311,
		}]
	}]
}]

export default menu