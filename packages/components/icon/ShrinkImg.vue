<template>
  <svg
    version="1.1"
    id="图层_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 42 42"
    style="enable-background: new 0 0 42 42"
    xml:space="preserve"
    :width="width"
    :height="height"
  >
    <g>
      <path
        id="XMLID_2721_"
        :fill="color"
        d="M40,20.5c0,4.9-1.9,9.7-5.6,13.4c-7.4,7.4-19.5,7.4-26.9,0c-7.4-7.4-7.4-19.5,0-26.9l0,0
            c3.6-3.6,8.4-5.6,13.4-5.6s9.8,2,13.4,5.6C38.2,10.8,40,15.6,40,20.5z M5.1,20.5c0,4.1,1.6,8.2,4.7,11.3c6.2,6.2,16.4,6.2,22.6,0
            c6.2-6.2,6.2-16.4,0-22.6c-3-3-7-4.7-11.3-4.7S12.8,6.2,9.7,9.2l0,0C6.6,12.3,5.1,16.4,5.1,20.5z"
      />
      <g>
        <path
          id="XMLID_2720_"
          :fill="color"
          d="M22.5,24.4c0,0.4-0.1,0.8-0.4,1.1c-0.6,0.6-1.5,0.6-2.1,0l-7.8-7.8c-0.6-0.6-0.6-1.5,0-2.1
                c0.6-0.6,1.5-0.6,2.1,0l7.8,7.8C22.4,23.6,22.5,24,22.5,24.4z"
        />
        <path
          id="XMLID_2719_"
          :fill="color"
          d="M30.3,16.6c0,0.4-0.1,0.8-0.4,1.1l-7.8,7.8c-0.6,0.6-1.5,0.6-2.1,0c-0.6-0.6-0.6-1.5,0-2.1
                l7.8-7.8c0.6-0.6,1.5-0.6,2.1,0C30.2,15.8,30.3,16.2,30.3,16.6z"
        />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import baseSvgImg from './baseSvgImg'
export default defineComponent({
  extends: baseSvgImg,
  props: {
    color: {
      default: '#666',
      type: String,
    },
  },
})
</script>

<style scoped>
svg {
  display: block;
}
</style>
