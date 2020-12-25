<template>
  <div>
    <textarea
      @keypress.enter="postMessage"
      @keypress.13.prevent.stop="message == ''"
      v-model="message"
    >
    </textarea>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MessageComposer',
  data() {
    return {
      message: '',
    }
  },
  methods: {
    postMessage() {
      if (this.message !== '') {
        const messageObj = {
          author: {
            name: this.$store.state.name,
          },
          content: this.message,
        }
        axios.post(`http://${process.env.VUE_APP_BACKEND}/chats/messages/`, messageObj).then(() => {
          // add message to list and clear message
          console.log('messageObj: ', messageObj)
          this.$store.commit('addChats', [messageObj])
          this.$store.dispatch('sendChat', messageObj)
          this.message = ''
        })
        /*
          .catch((error) => {
            console.error(error)
          })
          */
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
