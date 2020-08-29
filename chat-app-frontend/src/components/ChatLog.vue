<template>
  <ul>
    <chat-message v-for="(chat, index) in chats" v-bind:key="index" v-bind:chat="chat">
    </chat-message>
  </ul>
</template>

<script>
import axios from 'axios'
import ChatMessage from '@/components/ChatMessage.vue'

export default {
  name: 'ChatLog',
  components: {
    ChatMessage,
  },
  mounted() {
    axios.get('http://127.0.0.1/chats/messages/').then((response) => {
      this.$store.commit('addChats', response.data)
    })
  },
  computed: {
    chats() {
      return this.$store.state.chats
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

ul
  display grid
  list-style-type none
  padding 0

a
  color #42b983
</style>
