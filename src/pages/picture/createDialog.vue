<template>
	<el-dialog title="编辑" :visible.sync="createVisible">
		<el-form label-width="120px" ref="form">
			<hi-form
				label="标题"
			></hi-form>
			<input name="file" type="file"/>
		</el-form>
		<div slot="footer">
			<el-button @click="createVisible">取消</el-button>
			<el-button type="primary" @click="confirm">确定</el-button>
		</div>
	</el-dialog>
</template>
<script type="text/javascript">
	import * as qiniu from 'qiniu-js'
	import HiForm from '@/components/HiForm'
	import Vuex from 'vuex'

	export default {
		data() {
			return {
				createVisible: false
			}
		},
		components: {
			HiForm
		},
		computed: {
			...Vuex.mapState({
				token: state => state.qiniu
			})
		},
		methods: {
			show() {
				this.createVisible = true
			},
			confirm() {
				let formData = new FormData(this.$refs.form.$el)
				let file = formData.get('file')
				let key = file.name
				let putExtra = {
					mimeType: ['image/png', 'image/jpeg'] || null
				}
				console.log(file)
				var observable = qiniu.upload(file, key, this.token, putExtra)
				var observer = {
					next(res) {
						console.log(res)
					},
					error(err) {
						console.log(err)
					}, 
					complete(res) {
						console.log(res)
					}
				}
				var subscription = observable.subscribe(observer) // 上传开始
				console.log(subscription)
				// // or
				// var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以
				// subscription.unsubscribe() // 上传取消
			}
		},
		mounted() {

		}
	}
</script>
