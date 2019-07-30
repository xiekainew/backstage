<template>
	<div class="blog">
		<div class="blog-title">
			<router-link to="/markdown">
				<el-button type="primary" @click="publish">发布</el-button>
			</router-link>
		</div>
		<hi-table
			:tableData="list"
			:tableHeaders="tableHeaders"
		></hi-table>
	</div>
</template>
<script type="text/javascript">
	import HiTable from '@/components/HiTable'
	import {
		getBlogList
	} from '@/api/common'
	export default {
		data() {
			return {
				value: '',
				list: [],
				tableHeaders: [{
					headerKey: 'title',
					headerName: '标题'
				}, {
					headerKey: 'content',
					headerName: '内容'
				}, {
					headerKey: 'create',
					headerName: '发布时间',
					type: 'date'
				}]
			}
		},
		components: {
			HiTable
		},
		mounted() {
			this.fetchList()
		},
		methods: {
			publish() {
				console.log(12)
			},
			fetchList() {
				getBlogList().then(res => {
					console.log(res)
					this.list = res.data || []
				})
			}
		}
	}
</script>
<style lang="scss">
	.blog{
		padding: 20px;
		background: white;
		&-title{
			text-align: right;
			padding-bottom: 15px;
		}
	}
</style>