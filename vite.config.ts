import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

// import { isVue2, isVue3, version } from 'vue-demi'

const path = require('path')
const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9700,
    cors: true,
    // open: ''
  },
  plugins: [
    vue(), // 提供模板编译，还支持.vue单文件组件（SFC）编译
    DefineOptions() // 单文件组件命名
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // vue: isVue2 ? resolve('/node_modules/vue2') : resolve('/node_modules/vue3')
    }
  },
  optimizeDeps: {
    // exclude: ['vue-demi']
  },
  build: { // 打包 库模式
    target: 'modules',
    outDir: 'lib',
    lib: {
      entry: './library/index.ts',
      name: '__golden__',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue'],
      input: './library/index.ts',
      output: []
    }
  }
})
