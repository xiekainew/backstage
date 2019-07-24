<template>
	<div class="picture">
		<el-button @click="create" type="primary">
			新增
		</el-button>
		<hi-table
			:data="list"
			:tableHeaders="tableHeaders"
		></hi-table>
		<create-dialog ref="create"></create-dialog>
	</div>
</template>
<script type="text/javascript">
	import HiTable from '@/components/HiTable'
	import CreateDialog from './createDialog.vue'
	export default {
		data() {
			return {
				list: [],
				tableHeaders: [{
					headerName: '标题',
					headerKey: 'title'
				}]
			}
		},
		components: {
			HiTable,
			CreateDialog
		},
		methods: {
			create() {
				this.$refs.create.show()
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss">
	.picture{
		background: white;
		padding: 20px;
	}
</style>