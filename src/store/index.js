import Vue from 'vue'
import Vuex, { Playload, Store} from 'vuex'
import VuePersist from 'vuex-persist'
import {
    getMenuList
} from '@/api/common.js'
Vue.use(Vuex)

const vuexLocal = new VuePersist({
    key: 'vuexbase',
    storage: window.localStorage,
    reducer: (state) => ({
        token: state.token,
        qiniu: state.qiniu
    })
})

export default new Vuex.Store({
	state: {
		isCollapse: false,
        menuList: [],
        token: '',
        qiniu: ''
	},
	mutations: {
		updateCollapse(state, data) {
			state.isCollapse = data
		},
        updateMenuList(state, data) {
            state.menuList = data
        },
        updateToken(state, data) {
            if (!data) return
            state.token = data.token
            state.qiniu = data.qiniu
        }
	},
	actions: {
        getMenu({commit}, data) {
            return new Promise((resolve, reject) => {
                getMenuList().then(res => {
                    if (res.status === 0) {
                        commit('updateMenuList', res.data || [])
                        resolve()
                    } else {
                        reject(res.msg)
                    }
                })
            })
        }
	},
    plugins: [vuexLocal.plugin]
})
