import { withInstall } from '@hanav/utils'

import Paper from './src/Paper.vue'
export const PaperVue = Paper

export const HPaper = withInstall(Paper)
export default HPaper

export * from './src/paper'
