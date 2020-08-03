<template>
  <div class="home">
    <ChatLog/>
    <transition name="fade">
      <ChatNamePopup v-if="!hasValidName"/>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatLog from '@/components/ChatLog.vue'
import ChatNamePopup from '@/components/ChatNamePopup.vue'

export default {
  name: 'Home',
  components: {
    ChatLog,
    ChatNamePopup,
  },
  computed: {
    hasValidName() {
      return this.$store.state.name
    },
  },
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
