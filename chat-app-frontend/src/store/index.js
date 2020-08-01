import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  setName: (state, name) => { state.name = name },
}

export default new Vuex.Store({
  state: {
    name: '',
  },
  mutations,
  actions: {
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',
})
