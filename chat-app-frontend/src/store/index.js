import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  setName: (state, name) => {
    state.name = name
  },
  addChats: (state, chats) => {
    state.chats = [...state.chats, ...chats]
  },
}

export const actions = {
  sendChat({ state }, newChat) {
    console.log(`Sending new chat: ${newChat}`)
    console.log(newChat)
    state.socket.send(JSON.stringify(newChat))
  },
}

export const getters = {
  isCurrentUser: (state) => (name) => state.name === name,
}

export default new Vuex.Store({
  state: {
    name: process.env.VUE_APP_CURRENT_USER || '',
    chats: [],
    socket: new WebSocket('ws://127.0.0.1/ws/chats/'),
  },
  getters,
  mutations,
  actions,
  modules: {},
  strict: process.env.NODE_ENV !== 'production',
})
