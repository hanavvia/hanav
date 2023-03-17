<script lang="ts">
import { defineComponent, computed } from 'vue'
import Example from './Example.vue'

export default defineComponent({
  name: 'Demo',
  components: {
    Example,
  },
  props: {
    description: {
      type: String,
      required: false,
    },
    demos: {
      type: Object,
      required: true,
    },
    source: String,
    rawSource: String,
    path: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const formatPathDemos = computed(() => {
      const demos = {}

      Object.keys(props.demos).forEach((key) => {
        demos[key.replace('../../examples/', '').replace('.vue', '')] =
          props.demos[key]
      })

      return demos
    })

    console.log(props.demos)
    console.log(props.path)
    console.log(formatPathDemos.value[props.path])
    console.log(formatPathDemos.value)

    return {
      formatPathDemos,
    }
  },
})
</script>
<template>
  <ClientOnly>
    <Example :file="path" :demo="formatPathDemos[path]" />
  </ClientOnly>
</template>
