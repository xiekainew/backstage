import Axios from 'axios'
import {
    Message
} from 'element-ui'
// Axios.defaults.baseURL = 'http://10.220.9.204:2001'

Axios.interceptors.request.use(config => {
  // console.log('请求拦截')
  return config
}, err => {
  return Promise.reject(err)
})

Axios.interceptors.response.use(response => {
  // console.log('返回拦截')
  if (response.data.status === 1002) {
    Message.warning('请登录')
    setTimeout(() => {
        window.location.href = '/login'
    }, 1000)
  }
  console.log(response)
  return response.data
}, error => {
    console.log(error)
    return Promise.reject(error)
})

export default Axios
