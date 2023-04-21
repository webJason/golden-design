<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      welcome to Jason's library
    </h3>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue-demi'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String
    }
  }
})
</script>

<style scoped>
.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
