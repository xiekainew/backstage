import Axios from 'axios'
import {
    Message
} from 'element-ui'
import Store from '@/store'
import Router from '../router/index.js'
// Axios.defaults.baseURL = 'http://10.220.9.204:2001'

Axios.interceptors.request.use(config => {
    config.headers.token = Store.state.token
    return config
}, err => {
    return Promise.reject(err)
})

Axios.interceptors.response.use(response => {
    if (response.data.status === 1002) {
        Message.warning('请登录')
        Store.commit('updateToken', null)
        setTimeout(() => {
            Router.push('/login')
        }, 500)
    }
    return response.data
}, error => {
    return Promise.reject(error)
})

export default Axios
