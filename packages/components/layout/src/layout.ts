import { ExtractPropTypes, PropType } from 'vue'

export interface CommonAreaProps {
  title?: string
  resize?: boolean
  shrinkTitle?: string[]
  padding?: number
}

export interface VerticalAreaProps extends CommonAreaProps {
  height?: number
}

export interface HorizontalAreaProps extends CommonAreaProps {
  width?: number
}

export const areas = ['top', 'bottom', 'center', 'left', 'right'] as const

export type AreaType = typeof areas[number]

export type LayoutLengthStateType = {
  topHeight?: number,
  bottomHeight?: number,
  leftHeight?: number,
  rightHeight?: number,
  centerHeight?: number,
  leftWidth?: number,
  rightWidth?: number,
}

export const layoutProps = {
  resize: {
    type: Boolean
  },
  top: {
    type: Object as PropType<VerticalAreaProps>,
  },
  bottom: {
    type: Object as PropType<VerticalAreaProps>,
  },
  left: {
    type: Object as PropType<HorizontalAreaProps>,
  },
  right: {
    type: Object as PropType<HorizontalAreaProps>,
  },
  center: {
    type: Object as PropType<CommonAreaProps>,
  }
}

export type LayoutPropType = ExtractPropTypes<typeof layoutProps>
