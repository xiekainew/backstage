<template>
	<div class="markdown">
		<div class="markdown-title">
			<el-input placeholder="输入标题" v-model="createModel.title"/>
		</div>
		<mavon-editor v-model="createModel.content"/>
		<div class="markdown-footer">
			<el-button type="primary" @click="save">保存</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		createBlog
	} from '@/api/common'
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

		},
		methods: {
			save() {
				createBlog(this.createModel).then(res => {
					console.log(res)
					if (res.status === 0) {
						this.$message.success('发布成功')
						this.$router.push('/blog')
					}
				})
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