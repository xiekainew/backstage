import Axios from '../common/http.js'

export const getMenuList = () => {
  return Axios.get('/menu/list')
}
