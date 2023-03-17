// vite.config.js
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

export default defineConfig({
  plugins: [vueJsx(), MarkdownTransform()],
})
