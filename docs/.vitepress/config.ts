import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'

export default defineConfig({
  markdown: {
    config: (md) => mdPlugin(md),
  },
})
