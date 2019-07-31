import Store from '../store/index.js'
import * as qiniu from 'qiniu-js'

export const Upload = (file, key, callback) => {
	let putExtra = {
		mimeType: ['image/png', 'image/jpeg']
	}
	var observable = qiniu.upload(file, key, Store.state.qiniu, putExtra)
	var observer = {
		next(res) {
			console.log(res)
		},
		error(err) {
			console.log(err)
		}, 
		complete(res) {
			console.log(res)
			callback(res)
		}
	}
	observable.subscribe(observer) // 上传开始
}
