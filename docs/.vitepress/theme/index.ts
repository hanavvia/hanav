import { Theme } from 'vitepress/dist/client'
import DefaultTheme from 'vitepress/theme'
import { HLayout, HGrid, HPaper, HForm } from '@hanav/components'
import AppVue from '../../App.vue'
import Demo from '../components/Demo.vue'
import '../styles/index.scss'
import '../../../packages/styles/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(HLayout)
    app.use(HGrid)
    app.use(HPaper)
    app.use(HForm)
    app.component('TestApp', AppVue)
    app.component('Demo', Demo)
  },
} as Theme
