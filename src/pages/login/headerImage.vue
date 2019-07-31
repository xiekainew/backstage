<template>
	<div class="header">
		<!-- <el-upload class="upload-demo" action="" drag 
:auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
      </el-upload> -->

      	<el-upload
      		action=""
			class="avatar-uploader"
			:on-change='changeUpload'
			:auto-upload="false"
			:show-file-list="false"
			>
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>

		<vueCropper
			ref="cropper"
			:img="option.img"
			:autoCrop="true"
			:fixedNumber="[1,1]"
			:fixed="true"
		></vueCropper>
		<div class="header-footer">
			<el-button type="primary" @click="save">保存</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { VueCropper } from 'vue-cropper'
	import { Upload } from '@/common/upload'
	import {
		updateUser
	} from '@/api/common'

	export default {
		data() {
			return {
				option: {
					img: ''
				},
				file: {
					name: ''
				},
				imageUrl: this.$store.state.userInfo.avatar
			}
		},
		mounted() {
		},
		methods: {
			changeUpload(file) {
				var that = this
				console.log(file)
				that.file = file
				var reader = new FileReader()
				reader.onload = function(e) {
					that.option.img = e.target.result
				}
				reader.readAsDataURL(file.raw)
			},
			save() {
				let that = this
				console.log(this.$refs.cropper)
				// this.$refs.cropper.getCropData((data) => {
				this.$refs.cropper.getCropBlob((data) => {
					console.log(data)
					let files = new window.File([data], this.file.name, {type: data.type})
					console.log(this.file)
					Upload(files, this.file.name, (res) => {
						let url = `http://pv4kob165.bkt.clouddn.com/${res.key}`
						console.log(res)
						that.update(url)
					})
				})
			},
			update(url) {
				updateUser({
					id: this.$store.state.userInfo.id,
					avatar: url
				}).then(res => {
					console.log(res)
					if (res.status === 0) {
						this.$message.success('更新成功！请重新登录！')
						this.$store.commit('updateToken', {})
						this.$router.push('/login')
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.header{
		padding: 20px;
		min-height: 400px;
		background: white;
		border-radius: 4px;
		&-footer{
			text-align: center;
			padding-top: 20px;
		}
	}
	.vue-cropper{
		height: 300px !important;
	}
	 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>