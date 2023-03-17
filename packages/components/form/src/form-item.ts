import { RuleItem } from 'async-validator'
import { PropType } from 'vue'

export const formItemProps = {
    label: {
        type: String
    },
    rules: {
        type: Array as PropType<RuleItem[]>
    }
}