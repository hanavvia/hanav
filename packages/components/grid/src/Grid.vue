<script lang="ts">
import { Table } from 'ant-design-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HGrid',
  components: {
    Table,
  },
  setup(props) {
    
  }
})
</script>
<template>
  <div class="h-grid">
    <Table />
  </div>
</template>
