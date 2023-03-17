<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GridBasic',
  setup() {
    const columns = [
      {
        checkbox: true,
      },
      {
        field: 'name',
        title: '姓名',
      },
    ]
    const data = [
      {
        name: '小明',
      },
    ]
    return {
      columns,
      data,
    }
  },
})
</script>
<template>
  <HGrid :data="data" :columns="columns" />
</template>
