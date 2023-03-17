import { withInstall } from '@hanav/utils'

import Layout from './src/Layout.vue'
export const LayoutVue = Layout

export const HLayout = withInstall(Layout)
export default HLayout

export * from './src/layout'
