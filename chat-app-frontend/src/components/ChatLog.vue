<template>
  <div>
    <ul>
      <chat-message
        v-for="(chat, index) in chats"
        v-bind:key="index"
        v-bind:chat="chat">
      </chat-message>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import ChatMessage from '@/components/ChatMessage.vue'

export default {
  name: 'ChatLog',
  components: {
    ChatMessage,
  },
  data() {
    return {
      chats: [],
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1/chats/messages/')
      .then((response) => { this.chats = response.data })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  display grid
  list-style-type none
  padding 0

a
  color #42b983
</style>
