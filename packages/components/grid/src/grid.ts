import { PropType } from 'vue'

export interface Column {
  field?: string
  checkbox?: boolean
  radio?: true
}

export const gridProps = {
  data: {
    type: Array as PropType<any[]>,
  },
  columns: {
    type: Array as PropType<Column[]>,
  },
}
