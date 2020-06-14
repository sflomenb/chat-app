<template>
  <div class="home">
    <ChatLog/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatLog from '@/components/ChatLog.vue'

export default {
  name: 'Home',
  components: {
    ChatLog,
  },
}
</script>
