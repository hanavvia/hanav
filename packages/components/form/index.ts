import { withInstall } from '@hanav/utils'

import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

export const HForm = withInstall(Form, {FormItem})
export default HForm

// export * from './src/form'
// export * from './src/form-item'
