<template>
	<div class="markdown">
		<div class="markdown-title">
			<el-input placeholder="输入标题" v-model="createModel.title"/>
		</div>
		<mavon-editor 
			ref="editor" 
			v-model="createModel.content"
			@imgAdd="imgAdd"
		/>
		<div class="markdown-footer">
			<el-button @click="back">返回</el-button>
			<el-button type="primary" @click="save">保存</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		createBlog
	} from '@/api/common'
	import * as qiniu from 'qiniu-js'
	import Vuex from 'vuex'
	export default {
		data() {
			return {
				createModel: {
					title: '',
					content: ''
				}
			}
		},
		mounted() {
			console.log(this.$refs.editor)
		},
		computed: {
			...Vuex.mapState({
				token: state => state.qiniu
			})
		},
		methods: {
			save() {
				createBlog({
					title: this.createModel.title,
					content: this.$refs.editor.d_render
				}).then(res => {
					console.log(res)
					if (res.status === 0) {
						this.$message.success('发布成功')
						this.$router.push('/blog')
					}
				})
			},
			imgAdd(name, file) {
				var that = this
				console.log(file)
				var observable = qiniu.upload(file, file.name, this.token)
				var observer = {
					next(res) {
						console.log(res)
					},
					error(err) {
						console.log(err)
					}, 
					complete(res) {
						console.log(res)
						let url = `http://pv4kob165.bkt.clouddn.com/${res.key}`
						console.log(res.key, url)
						// that.$refs.editor.$img2Url(res.key, url)
						that.$refs.editor.$img2Url(name, url)
					}
				}
				observable.subscribe(observer) // 上传开始
			},
			back() {
				this.$router.push('/blog')
			}
		}
	}
</script>
<style lang="scss">
	.markdown{
		padding: 20px;
		background: white;
		&-title{
			padding-bottom: 20px;
		}
		&-footer{
			text-align: right;
			padding-top: 15px;
		}
	}
</style>