import Axios from '../common/http.js'

export const getMenuList = () => {
  return Axios.get('/proxy/menu/list')
}

export const createMenu = (data) => {
  return Axios.post('/proxy/menu/create', data)
}

export const deleteMenu = (data) => {
  return Axios.post('/proxy/menu/delete', data)
}

export const getUserList = () => {
    return Axios.get('/proxy/server/user/list')
}

export const goLogin = (data) => {
    return Axios.post('/proxy/server/login', data)
}

export const register = (data) => {
    return Axios.post('/proxy/server/register', data)
}
export const deleteUser = (data) => {
    return Axios.post('/proxy/server/delete', data)
}
