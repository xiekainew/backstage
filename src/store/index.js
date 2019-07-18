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
        token: state.token
    })
})

export default new Vuex.Store({
	state: {
		isCollapse: false,
        menuList: [],
        token: ''
	},
	mutations: {
		updateCollapse(state, data) {
			state.isCollapse = data
		},
        updateMenuList(state, data) {
            state.menuList = data
        },
        updateToken(state, data) {
            state.token = data
        }
	},
	actions: {
        getMenu({commit}, data) {
            getMenuList().then(res => {
                if (res.status === 0) {
                    commit('updateMenuList', res.data || [])
                }
            })
        }
	},
    plugins: [vuexLocal.plugin]
})
