const menu = [{
	title: '首页',
	icon: 'el-icon-s-grid',
	path: '/dashboard',
	id: '1',
	children: []
}, {
	title: '用户管理',
	icon: 'el-icon-user-solid',
	path: '/user',
	id: '2',
	children: []
}, {
	title: '角色管理',
	icon: 'el-icon-star-on',
	id: '3',
	children: [{
		title: '用户管理',
		icon: 'el-icon-user-solid',
		id: '31',
		children: [{
			title: '用户管理2',
			icon: 'el-icon-user-solid',
			path: '/user2',
			id: '311'
		}]
	}]
}, {
	title: '数据管理',
	icon: 'el-icon-s-marketing',
	path: '/database'
}]

export default menu