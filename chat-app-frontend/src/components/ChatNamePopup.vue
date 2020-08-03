<template>
  <div id="background">
    <div id="popup">
      <div id="container">
        <p>Enter a name to get started</p>
        <input @keypress.enter="submitName"
           @keypress.13.prevent.stop="!validName"
           v-model="name">
        <p>You have entered {{ name }}</p>
        <button :disabled="!validName" @click="submitName" id="submit">Submit</button>
        <p v-show="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatNamePopup',
  data() {
    return {
      name: '',
      hasValidName: false,
      errorMessage: '',
      NAME_REGEX: /^[a-zA-Z]+$/,
    }
  },
  methods: {
    submitName() {
      if (this.validName) {
        axios
          .post('http://127.0.0.1/chats/users/', {
            name: this.name,
          })
          .then(() => {
            this.$store.commit('setName', this.name)
          })
          .catch((error) => {
            if (error.response.data.name && error.response.data.name[0] === 'user with this name already exists.') {
              this.errorMessage = `${this.name} is already taken, please choose a different name`
            }
          })
      }
    },
  },
  computed: {
    validName() {
      return this.NAME_REGEX.test(this.name)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#background
  background-color rgba(0, 0, 0, 0.5)
  width 100%
  min-height 100%
  position absolute
  overflow auto
  margin auto
  top 0
  left 0
  bottom 0
  right 0
  border solid black

#popup
  background-color white
  height 30vh
  width 80vw
  margin 30vh auto auto auto

#container
  padding-top 10px

.error
  color red
</style>
