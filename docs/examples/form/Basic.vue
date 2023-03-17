<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormBasic',
})
</script>
<template>
    <HForm>
        <HFormItem label="Username" :rules="[{required: true}]">
            <input />
        </HFormItem>
    </HForm>
</template>
