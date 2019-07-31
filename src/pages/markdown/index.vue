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
			:clickData="clickData"
			@clickRow="clickFirst"
			@clickRight="clickRight"
		></hi-table>
		<el-dialog :title="blogData.title" center :visible.sync="showVisible">
			<mavon-editor
				v-html="blogData.content"
				defaultOpen='preview'
				:subfield="false"
				:toolbarsFlag="false"
				:boxShadow="false"
			></mavon-editor>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import HiTable from '@/components/HiTable'
	import {
		getBlogList,
		deleteBlog
	} from '@/api/common'
	import 'mavon-editor/dist/css/index.css'
	export default {
		data() {
			return {
				value: '',
				list: [],
				tableHeaders: [{
					headerKey: 'title',
					headerName: '标题',
					click: true,
					ableInput: true
				}, {
					headerKey: 'create',
					headerName: '发布时间',
					type: 'date'
				}],
				showVisible: false,
				blogData: {},
				clickData: [{
					label: '删除',
					value: 'del'
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
			},
			clickFirst(value, item, index) {
				this.showVisible = true
				this.blogData = value
			},
			clickRight(data) {
				switch (data.type) {
					case 'del':
						this.deleteBlog(data.row.id)
						break
					default:
						// statements_def
						break
				}
			},
			deleteBlog(id) {
				this.$confirm('确认删除吗？', '提示信息', {type: 'warning'}).then(() => {
					deleteBlog({id}).then(res => {
						this.$message.success('删除成功')
						this.fetchList()
					})
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