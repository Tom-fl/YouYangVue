import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userName: '',
        userId: ''
    },
    mutations: {
        set(state, newName) {
            state.userName = newName
        }
    }
})

export default store