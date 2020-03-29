<template>
  <div>
    <ul>
      <li
        v-for="(chat, index) in chats"
        v-bind:key="index"
        >
        {{ chat.author.name }}: {{ chat.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatLog',
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
  list-style-type none
  padding 0

li
  display grid
  margin 0 10px
  padding 0px 20%

a
  color #42b983
</style>
