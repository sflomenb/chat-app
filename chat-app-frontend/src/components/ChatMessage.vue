<template>
  <li>
    {{ chat.author.name }}: {{ chat.content }}
  </li>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    chat: Object,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
