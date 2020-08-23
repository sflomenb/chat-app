<template>
  <li v-bind:class="classObject">
    {{ chat.author.name }}: {{ chat.content }}
  </li>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    chat: Object,
  },
  computed: {
    classObject() {
      return {
        active: this.chat.author.name === this.$store.state.name,
        other: this.chat.author.name !== this.$store.state.name,
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.active
  justify-self end

.other
  justify-self start
</style>
