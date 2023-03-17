import { PropType } from "vue"

export const paperProps = {
    /**
     * 内边距
     */
    paddingTop: String,
    paddingBottom: String,
    paddingLeft: String,
    paddingRight: String,
    /**
     * 高
     */
    height: String,
    /**
     * 宽
     */
    width: String,
    /**
     * 类型：A4等
     */
    type: {
        type: String as PropType<PaperPresetSize>
    }
}

/**
 * 预设大小
 */
export const presetSize = {
    A5: {
        width: '148mm',
        height: '210mm',
    },
    A4: {
        width: '210mm',
        height: '297mm',
    },
    A3: {
        width: '297mm',
        height: '420mm',
    },
    A2: {
        width: '420mm',
        height: '594mm',
    },
    A1: {
        width: '594mm',
        height: '841mm',
    }
}

export type PaperPresetSize = keyof typeof presetSize

