<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    file: {
      type: String,
      required: true,
    },
    demo: {
      type: Object,
      required: true,
    },
  },
})
</script>

<template>
  <div class="example-showcase">
    <ClientOnly>
      <component :is="demo" v-if="demo" v-bind="$attrs" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: var(--bg-color);
}
</style>
