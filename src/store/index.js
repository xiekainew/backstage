import Vue from 'vue'
import Vuex from 'vuex'

import {
    getMenuList
} from '@/api/common.js'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		isCollapse: false,
        menuList: []
	},
	mutations: {
		updateCollapse(state, data) {
			state.isCollapse = data
		},
        updateMenuList(state, data) {
            state.menuList = data
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
	}
})
