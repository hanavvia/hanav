<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { paperProps, presetSize } from './paper'

export default defineComponent({
  name: 'HPaper',
  props: paperProps,
  setup(props) {
    const wrapperStyle = computed<CSSProperties>(() => {
      let wh = presetSize['A4']
      if(props.height && props.width) {
        wh = {
            height: props.height,
            width: props.width
        }
      }else if (props.type) {
        wh = presetSize[props.type]
      }
      return {
        padding: `${props.paddingTop || 0} ${props.paddingRight || 0} ${
          props.paddingBottom || 0
        } ${props.paddingLeft || 0}`,
        ...wh
      }
    })

    return {
      wrapperStyle,
    }
  },
})
</script>
<template>
  <div class="h-paper-wrapper" :style="wrapperStyle">
    <slot />
  </div>
</template>
