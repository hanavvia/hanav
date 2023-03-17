<script lang="ts">
import { computed, defineComponent } from 'vue'
import { formItemProps } from './form-item'

export default defineComponent({
  name: 'HFormItem',
  props: formItemProps,
  setup(props) {
    const required = computed(() => {
      return props.rules && props.rules.some((r) => r.required)
    })
    return {
      required,
    }
  },
})
</script>
<template>
  <div class="h-from-item">
    <label :class="[{ 'h-form-item-required': required }]">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div class="h-form-item-control-input">
      <div class="h-form-item-control-input-content">
        <slot />
      </div>
    </div>
  </div>
</template>
