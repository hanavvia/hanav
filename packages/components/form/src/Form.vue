<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HForm',
})
</script>
<template>
  <form class="h-form">
    <slot />
  </form>
</template>
