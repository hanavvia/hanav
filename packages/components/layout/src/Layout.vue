<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import IconDragUpDown from '../../icon/IconDragUpDown.vue'
import ShrinkImg from '../../icon/ShrinkImg.vue'
import IconDragLeftRight from '../../icon/IconDragLeftRight.vue'
import {
  CommonAreaProps,
  AreaType,
  LayoutLengthStateType,
  layoutProps,
} from './layout'
import { propI18N, isMobile } from '@hanav/utils'

export default defineComponent({
  name: 'HLayout',
  props: layoutProps,
  components: {
    IconDragUpDown,
    IconDragLeftRight,
    ShrinkImg,
  },
  emits: ['resize'],
  setup(props, { emit }) {
    const resizing = ref<boolean>()
    let dragArea: AreaType | undefined
    let dragInitX: number = 0
    let dragInitY: number = 0
    let dragInitTopHeight = 0
    let dragInitBottomHeight = 0
    let dragInitLeftWidth = 0
    let dragInitRightWidth = 0
    const layout = ref<HTMLDivElement>()
    const top = ref<HTMLDivElement>()
    const bottom = ref<HTMLDivElement>()
    const left = ref<HTMLDivElement>()
    const right = ref<HTMLDivElement>()
    const center = ref<HTMLDivElement>()
    const lengthState = reactive<LayoutLengthStateType>({})
    const expandInitLengthState = reactive<LayoutLengthStateType>({})
    let lengthChangeType: keyof LayoutLengthStateType | undefined
    // 是否可以收缩
    const shrinkType = (option?: CommonAreaProps) => {
      return option && (option.title || (option.shrinkTitle?.length || 0) > 0)
    }

    const layoutShrink = (type: keyof LayoutLengthStateType) => {
      if (lengthState[type] === 30 && expandInitLengthState[type]) {
        lengthState[type] = expandInitLengthState[type]
        expandInitLengthState[type] = 0
      } else {
        expandInitLengthState[type] = lengthState[type]
        lengthState[type] = 30
      }

      emit('resize', type, lengthState[type])
    }

    const getPadding = (area: AreaType) => {
      return props[area]?.padding || 0
    }

    const areaResizable = (area: AreaType) => {
      if (area === 'bottom' || area === 'top') {
        return (
          (props[area]?.height || 0) > 0 &&
          (props[area]?.resize || props.resize)
        )
      } else if (area === 'left' || area === 'right') {
        return (
          (props[area]?.width || 0) > 0 && (props[area]?.resize || props.resize)
        )
      }
    }

    const dragMove = (xOffset: number, yOffset: number) => {
      if (!resizing.value) return
      let topOffsetHeight = top.value?.offsetHeight || 0
      let bottomOffsetHeight = bottom.value?.offsetHeight || 0
      let centerOffsetHeight = center.value?.offsetHeight || 0
      let centerOffsetWidth = center.value?.offsetWidth || 0
      let leftOffsetWidth = left.value?.offsetWidth || 0
      let rightOffsetWidth = right.value?.offsetWidth || 0
      if (dragArea === 'top' || dragArea === 'bottom') {
        const pageY = yOffset
        let distance = pageY - dragInitY
        if (Math.abs(distance) < 3) return
        if (dragArea === 'top') {
          console.log(distance)
          if (distance > 0 && centerOffsetHeight < 50) return
          if (distance < 0 && topOffsetHeight < 50) return
          lengthState.topHeight = dragInitTopHeight + distance
          topOffsetHeight + distance < 50 && (lengthState.topHeight = 50)
        }
        if (dragArea === 'bottom') {
          if (distance < 0 && centerOffsetHeight < 50) return
          if (distance > 0 && bottomOffsetHeight < 50) return
          lengthState.bottomHeight = dragInitBottomHeight - distance
        }
        // dragInitY = pageY
      } else if (dragArea === 'left' || dragArea === 'right') {
        const pageX = xOffset
        let distance = pageX - dragInitX
        if (Math.abs(distance) < 3) return
        if (dragArea === 'left') {
          if (distance < 0 && leftOffsetWidth < 50) return
          if (distance > 0 && centerOffsetWidth < 50) return
          lengthState.leftWidth = dragInitLeftWidth + distance
        }
        if (dragArea === 'right') {
          if (distance < 0 && centerOffsetWidth < 50) return
          if (distance > 0 && rightOffsetWidth < 50) return
          lengthState.rightWidth = dragInitRightWidth - distance
        }
        // dragInitX = pageX
      }
    }

    const touchmove = (e: TouchEvent) =>
      dragMove(
        (e as TouchEvent).touches[0].pageX,
        (e as TouchEvent).touches[0].pageY
      )

    const mouchmove = (e: MouseEvent) =>
      dragMove((e as MouseEvent).pageX, (e as MouseEvent).pageY)

    const dragDown = (e: Event, area: AreaType) => {
      dragInitX = (e as MouseEvent).pageX || 0
      dragInitY = (e as MouseEvent).pageY || 0
      dragInitTopHeight = top.value?.offsetHeight || 0
      dragInitBottomHeight = bottom.value?.offsetHeight || 0
      dragInitLeftWidth = bottom.value?.offsetHeight || 0
      dragInitRightWidth = bottom.value?.offsetHeight || 0
      resizing.value = true
      dragArea = area
      if (isMobile()) {
        document.addEventListener('touchmove', touchmove, false)
        document.addEventListener('touchend', dragUp, false)
      } else {
        document.addEventListener('mousemove', mouchmove, false)
        document.addEventListener('mouseup', dragUp, false)
      }
    }

    const dragUp = () => {
      emit('resize', dragArea)
      dragInitX = 0
      dragInitY = 0
      resizing.value = false
      dragArea = undefined
      // TODO
      document.removeEventListener('mousemove', mouchmove, false)
      document.removeEventListener('touchmove', touchmove, false)
      document.removeEventListener('touchend', dragUp, false)
      document.removeEventListener('mouseup', dragUp, false)
      console.log('dragUp')
    }
    const mobileDragMove = (e: TouchEvent) => {
      const distance = e.touches[0].pageY
      if (Math.abs(distance) < 3) {
        return
      }
      lengthState[lengthChangeType!] =
        (lengthState[lengthChangeType!] || 0) + distance
    }
    const mobileDragUp = () => {
      dragInitY = 0
      lengthChangeType = undefined
      document.removeEventListener('touchmove', mobileDragMove, false)
      document.removeEventListener('touchend', mobileDragUp, false)
    }

    const mobileDragDown = (
      e: TouchEvent,
      direction: keyof LayoutLengthStateType
    ) => {
      lengthState[direction] =
        (e.target as HTMLElement).parentElement?.parentElement?.offsetHeight ||
        0
      dragInitY = e.touches[0].pageY
      lengthChangeType = direction
      document.addEventListener('touchmove', mobileDragMove, false)
      document.addEventListener('touchend', mobileDragUp, false)
    }

    onMounted(() => {
      // 计算长度
      if (layout.value) {
        // TODO
        // const height = layout.value.offsetHeight
        // const width = layout.value.offsetWidth
        lengthState.topHeight = props.top?.height || 0
      }
    })

    return {
      expandInitLengthState,
      lengthState,
      resizing,
      shrinkType,
      propI18N,
      layoutShrink,
      getPadding,
      areaResizable,
      dragDown,
      mobileDragDown,
      center,
      top,
      layout,
      bottom,
      left,
      right,
    }
  },
})
</script>
<template>
  <div class="layout" ref="layout" :class="{ resizing: resizing }">
    <div
      :style="{ height: `${lengthState.topHeight}px` }"
      :class="['top', 'region', { 'region-top': top?.title }]"
    >
      <div
        v-if="shrinkType(top)"
        :class="[
          'expand-collapse',
          {
            horizontal:
              lengthState.topHeight === 30 && expandInitLengthState.topHeight,
          },
          {
            'only-shrink-icon':
              !top?.title && (top?.shrinkTitle?.length || 0) > 0,
          },
        ]"
      >
        <span class="expand-round">
          <template
            v-if="
              lengthState.topHeight === 30 &&
              expandInitLengthState.topHeight &&
              (top?.shrinkTitle?.length || 0) > 0
            "
          >
            <span :title="item" v-for="item in top?.shrinkTitle" :key="item">{{
              item
            }}</span>
          </template>
          <span v-else :title="top?.title">{{ propI18N(top?.title) }}</span>
        </span>
        <shrink-img
          class="expand-icon"
          v-bind="{ color: '#999', width: '16px', height: '16px' }"
          @click.native="layoutShrink('topHeight')"
        />
      </div>
      <div
        :class="['body', { shrink: top?.title }]"
        ref="top"
        :style="{ padding: getPadding('top') }"
      >
        <slot name="top" />
      </div>
      <i
        :class="['top-center', 'split', { 'drag-drop': resizing }]"
        v-if="areaResizable('top')"
        @mousedown="dragDown($event, 'top')"
      ></i>
      <span
        class="top-center mobile-split"
        v-if="areaResizable('top')"
        @touchstart="dragDown($event, 'top')"
      >
      </span>
      <span
        class="top-center mobile-mode-split"
        @touchstart="mobileDragDown($event, 'topHeight')"
      >
        <icon-drag-up-down />
      </span>
    </div>
    <div class="center-container">
      <div
        class="left region"
        :style="{
          width: `${lengthState.leftWidth}px`,
          height: `${lengthState.leftHeight}px`,
        }"
        :class="{ 'region-left': left?.title }"
      >
        <div
          v-if="shrinkType(left)"
          class="expand-collapse"
          :class="{
            vertical:
              lengthState.leftWidth === 30 && expandInitLengthState.leftWidth,
          }"
        >
          <div class="expand-round">
            <span :title="left?.title">{{ propI18N(left?.title) }}</span>
            <shrink-img
              class="expand-icon expend"
              v-bind="{ color: '#999', width: '16px', height: '16px' }"
              @click.native="layoutShrink('leftWidth')"
            />
          </div>
        </div>
        <div
          class="body"
          :class="{ shrink: left?.title }"
          ref="left"
          :style="{ padding: getPadding('left') }"
        >
          <slot name="left"></slot>
        </div>
        <i
          class="left-center split"
          v-if="areaResizable('left')"
          @mousedown="dragDown($event, 'left')"
          :class="{ 'drag-drop': resizing }"
        ></i>
        <span
          class="left-center mobile-split"
          v-if="areaResizable('left')"
          @touchstart="dragDown($event, 'left')"
        >
          <icon-drag-left-right />
        </span>
        <span
          class="left-center mobile-mode-split"
          @touchstart="mobileDragDown($event, 'leftHeight')"
        >
          <icon-drag-up-down />
        </span>
      </div>
      <div
        class="center region"
        :class="{
          'region-center': right?.title,
          'in-panel-remove-left-border': left?.width === 0,
          'in-panel-remove-right-border': right?.width === 0,
        }"
        :style="{ height: lengthState.centerHeight }"
      >
        <div v-if="center?.title" class="expand-collapse">
          <div class="expand-round">
            <span :title="center?.title">{{ propI18N(center?.title) }}</span>
          </div>
        </div>
        <div
          class="body"
          :class="{ shrink: center?.title }"
          ref="center"
          :style="{ padding: getPadding('center') }"
        >
          <slot name="center"></slot>
        </div>
        <i class="mask" :class="{ 'drag-drop': resizing }"></i>
        <span
          class="center mobile-mode-split"
          @touchstart="mobileDragDown($event, 'centerHeight')"
        >
          <icon-drag-up-down />
        </span>
      </div>
      <div
        class="right region"
        :style="{
          width: `${lengthState.rightWidth}px`,
          height: `${lengthState.rightHeight}px`,
        }"
        :class="{ 'region-right': right?.title }"
      >
        <div
          v-if="shrinkType(right)"
          class="expand-collapse"
          :class="{
            vertical:
              lengthState.rightWidth === 30 && expandInitLengthState.rightWidth,
          }"
        >
          <div class="expand-round">
            <span :title="right?.title">{{ propI18N(right?.title) }}</span>
            <shrink-img
              class="expand-icon expend"
              v-bind="{ color: '#999', width: '16px', height: '16px' }"
              @click.native="layoutShrink('rightWidth')"
            />
          </div>
        </div>
        <div
          class="body"
          :class="{ shrink: right?.title }"
          ref="right"
          :style="{ padding: getPadding('right') }"
        >
          <slot name="right"></slot>
        </div>
        <i
          class="center-right split"
          v-if="areaResizable('right')"
          @mousedown="dragDown($event, 'right')"
          :class="{ 'drag-drop': resizing }"
        ></i>
        <span
          class="center-right mobile-split"
          v-if="areaResizable('right')"
          @touchstart="dragDown($event, 'right')"
        >
          <icon-drag-left-right />
        </span>
        <span
          class="center-right mobile-mode-split"
          @touchstart="mobileDragDown($event, 'rightHeight')"
        >
          <icon-drag-up-down />
        </span>
      </div>
    </div>
    <div class="bottom region">
      <div
        v-if="shrinkType(bottom)"
        class="expand-collapse"
        :class="{
          horizontal:
            lengthState.bottomHeight === 30 &&
            expandInitLengthState.bottomHeight,
          'only-shrink-icon':
            !bottom?.title && (bottom?.shrinkTitle?.length || 0) > 0,
        }"
      >
        <span class="expand-round">
          <template
            v-if="
              lengthState.bottomHeight === 30 &&
              expandInitLengthState.bottomHeight &&
              (bottom?.shrinkTitle?.length || 0) > 0
            "
          >
            <span
              :title="item"
              v-for="item in bottom?.shrinkTitle"
              :key="item"
              >{{ item }}</span
            >
          </template>
          <span v-else :title="bottom?.title">{{
            propI18N(bottom?.title)
          }}</span>
        </span>
        <shrink-img
          class="expand-icon"
          v-bind="{ color: '#999', width: '16px', height: '16px' }"
          @click.native="layoutShrink('bottomHeight')"
        />
      </div>
      <div
        class="body"
        :class="{ shrink: bottom?.title }"
        ref="bottom"
        :style="{ padding: getPadding('bottom') }"
      >
        <slot name="bottom"></slot>
      </div>
      <i
        class="center-bottom split"
        :class="{ 'drag-drop': resizing }"
        v-if="areaResizable('bottom')"
        @mousedown="dragDown($event, 'bottom')"
      ></i>
      <span
        class="center-bottom mobile-split"
        v-if="areaResizable('bottom')"
        @touchstart="dragDown($event, 'bottom')"
      >
        <icon-drag-up-down />
      </span>
    </div>
  </div>
</template>
<style scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.layout.resizing {
  user-select: none;
}

.layout .mobile-split,
.layout .mobile-mode-split {
  display: none;
  font-size: 14px;
  color: #007aff;
}

.layout[edit='layoutEditing'] {
  overflow: hidden;
}

.layout[edit='layoutEditing'] .mobile-mode-split {
  top: auto;
  bottom: -12px;
  right: auto;
  left: auto;
}

.layout[edit='layoutEditing'] .mobile-mode-split {
  display: none;
  position: absolute;
  left: 50%;
  bottom: -12px;
  margin-left: -16px;
  width: 32px;
  height: 24px;
  border-radius: 2px;
  z-index: 5;
  text-align: center;
  line-height: 28px;
  background-color: #fff;
  box-shadow: 0 0 2px #007aff;
}

.layout[edit='layoutEditing'] > .top > .mobile-split,
.layout[edit='layoutEditing'] > .bottom > .mobile-split {
  display: block;
  position: absolute;
  left: 50%;
  bottom: -12px;
  margin-left: -16px;
  width: 32px;
  height: 24px;
  border-radius: 2px;
  z-index: 2;
  text-align: center;
  line-height: 28px;
  background-color: #fff;
  box-shadow: 0 0 2px #007aff;
}

.layout[edit='layoutEditing'] > .bottom > .mobile-split {
  top: -12px;
  bottom: auto;
}

.layout[edit='layoutEditing'] > .center-container > .left > .mobile-split,
.layout[edit='layoutEditing'] > .center-container > .right > .mobile-split {
  display: block;
  position: absolute;
  top: 50%;
  right: -12px;
  margin-top: -16px;
  height: 32px;
  width: 24px;
  border-radius: 2px;
  z-index: 2;
  text-align: center;
  line-height: 34px;
  background-color: #fff;
  box-shadow: 0 0 2px #007aff;
}

.layout[edit='layoutEditing'] > .center-container > .right > .mobile-split {
  left: -12px;
  right: auto;
}

.layout[edit='layoutEditing'] .split {
  display: none;
}

.layout[edit='layoutEditing'] .body::after {
  position: absolute;
  content: '';
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  overflow: hidden;
  z-index: 1;
  border: 2px solid #007aff;
}

.center-container {
  display: flex;
  flex: 1;
  /* overflow: hidden; */
}

.layout > .center-container > .center {
  flex: 1;
}

.layout > .center-container > .center > .mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
}

.layout > .center-container > .center > .mask.drag-drop {
  display: block;
}

.layout > .center-container > .center,
.layout > .center-container > .top,
.layout > .center-container > .bottom,
.layout > .center-container > .left,
.layout > .center-container > .right {
  position: relative;
}

.layout > .center-container > .region > .split.center-right,
.layout > .center-container > .region > .split.left-center {
  position: absolute;
  width: 8px;
  height: 100%;
  background-color: transparent;
  cursor: col-resize;
  z-index: 7;
}

.region > .split.left-center {
  right: -8px;
}

.region > .split.center-right {
  left: -8px;
}

.layout > .region > .split.top-center,
.layout > .region > .split.center-bottom {
  position: absolute;
  height: 8px;
  width: 100%;
  background-color: transparent;
  cursor: row-resize;
  z-index: 7;
}

.layout > .region > .split.top-center {
  bottom: -8px;
}

.layout > .region > .split.center-bottom {
  top: -8px;
}

.layout .region {
  position: relative;
}

.body {
  height: 100%;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.body.shrink {
  padding-top: 30px;
}

.no-user-select {
  user-select: none;
}

.left > .body >>> .tab {
  padding-right: 0;
}

.layout .region {
  transition: width 0.3s, height 0.3s;
  position: relative;
}

.layout .region.region-top {
  border: 1px solid #eee;
  border-bottom: none;
}

.layout .region.region-bottom {
  border: 1px solid #eee;
  border-top: none;
}

.layout .region.region-left {
  border: 1px solid #eee;
  border-right: none;
}

.layout .region.region-right {
  border: 1px solid #eee;
  border-left: none;
}

.layout .region.region-center {
  border: 1px solid #eee;
}

.layout.no-user-select .region {
  transition: none;
}

.layout.no-user-select .region .panel-body {
  overflow: hidden;
}
</style>

<style>
.layout > .center-container > .left > .body > .grid {
  padding-right: 0;
}

.layout > .center-container > .right > .body > .grid {
  padding-left: 0;
}

.layout .region > .split.drag-drop {
  /* 这里不加!important覆盖不了 */
  width: 100% !important;
  height: 100% !important;
}

/* 模块展开or收缩 */
.layout .region > .expand-collapse {
  width: 100%;
  height: 30px;
  padding: 0 8px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
}

.layout .region > .expand-collapse.only-shrink-icon {
  width: 36px;
  position: absolute;
  top: 8px;
  left: auto;
  right: 0;
  background-color: transparent;
}

.layout .region > .expand-collapse.only-shrink-icon .expand-round {
  display: none;
}

.layout .region > .expand-collapse .expand-round {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout .region > .expand-collapse .expand-round span {
  flex: 1;
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.75);
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
}

.layout .region > .expand-collapse.horizontal,
.layout .region > .expand-collapse.vertical {
  width: 100%;
  height: 100%;
  top: 0px;
  right: 0px;
  background-color: #fafafa;
}

.layout .region > .expand-collapse.vertical {
  display: block;
  padding: 8px 0;
  border-top: none;
}

.layout .region > .expand-collapse.horizontal .expand-round {
  display: inline-block;
  width: auto;
  max-width: 95%;
  /* border-radius: 0 15px 15px 0; */
  border-right: 1px solid #e6e6e6;
  position: relative;
  left: 0;
  background-color: #fff;
}

.layout .region > .expand-collapse.horizontal .expand-round span {
  display: inline-block;
  height: 100%;
  line-height: 28px;
  padding: 0 8px;
  border-right: 1px solid #eee;
}

.layout .region > .expand-collapse.horizontal .expand-round span:last-child {
  border-right: none;
}

.layout .region > .expand-collapse .expand-round .expand-icon.expend {
  transform: rotate(90deg);
}

.layout .region.left > .expand-collapse .expand-round .expand-icon.expend {
  transform: rotate(270deg);
}

.layout .region > .expand-collapse.horizontal .expand-icon {
  transform: rotate(180deg);
}

.layout .region > .expand-collapse.vertical .expand-round {
  height: auto;
  max-height: 100%;
  text-align: center;
  padding: 8px 4px 30px 4px;
  border-radius: 0 0 15px 15px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  top: 0;
  align-items: stretch;
  background-color: #fff;
}

.layout .region > .expand-collapse.vertical .expand-round span {
  margin-right: 0;
  word-break: normal;
}

.layout .region > .expand-collapse.vertical .expand-round .expand-icon {
  position: absolute;
  left: 6px;
  bottom: 6px;
}

.layout .region > .expand-collapse.vertical .expand-round .expand-icon.expend {
  transform: rotate(270deg);
}

.layout
  .region.left
  > .expand-collapse.vertical
  .expand-round
  .expand-icon.expend {
  transform: rotate(90deg);
}

.layout .region > .expand-collapse .expand-round .expand-icon {
  transition: transform 0.5s;
}

.layout .region > .body.overflow {
  overflow: hidden;
}
</style>
