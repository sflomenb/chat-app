import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  setName: (state, name) => { state.name = name },
  addChats: (state, chats) => {
    state.chats = [...state.chats, ...chats]
  },
}

export default new Vuex.Store({
  state: {
    name: '',
    chats: [],
  },
  mutations,
  actions: {
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',
})
