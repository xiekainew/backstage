import Axios from 'axios'
Axios.defaults.baseURL = 'http://10.220.9.204:2001'

Axios.interceptors.request.use(config => {
  console.log('请求拦截')
  return config
}, err => {
  return Promise.reject(err)
})

Axios.interceptors.response.use(response => {
  console.log('返回拦截')
  return response.data
}, error => {
  return Promise.reject(error)
})

export default Axios
