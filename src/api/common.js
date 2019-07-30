import Axios from '../common/http.js'
console.log(process.env.PORT)

export const getMenuList = () => {
  return Axios.get('/api/menu/list')
}

export const createMenu = (data) => {
  return Axios.post('/api/menu/create', data)
}

export const deleteMenu = (data) => {
  return Axios.post('/api/menu/delete', data)
}

export const getUserList = () => {
    return Axios.get('/api/server/user/list')
}

export const goLogin = (data) => {
    return Axios.post('/api/server/login', data)
}

export const register = (data) => {
    return Axios.post('/api/server/register', data)
}
export const deleteUser = (data) => {
    return Axios.post('/api/server/delete', data)
}

export const createBlog = (data) => {
    return Axios.post('/api/blog/create', data)
}
export const getBlogList = (data) => {
    return Axios.get('/api/blog/list', data)
}
