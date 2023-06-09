import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 3
// import * as compiler from '@vue/compiler-sfc'
// import { createVuePlugin } from 'vite-plugin-vue2' // <2.7
import DefineOptions from 'unplugin-vue-define-options/vite'

import { isVue2, isVue3, version } from 'vue-demi'
console.log('-version-',isVue2, isVue3, version)

const path = require('path')
const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}
// __dirname 是vite.config.ts所在目录

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9700,
    cors: true,
    // open: ''
  },
  plugins: [
    vue(), // 提供模板编译，还支持.vue单文件组件（SFC）编译；提供vite支持；
    // isVue2 ? createVuePlugin() : vue(),
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
  // vite 严格来说不是打包工具，而是一个前端构建工具，vite 实际使用 Rollup 和 esbuild 打包。
  build: { // 打包 库模式
    target: 'modules',
    // outDir: 'lib',
    // minify: false,
    lib: {
      entry: './library/index.ts',
      // formats: ['es', 'cjs'], // 默认['es', 'umd'] // rollupOptions 将忽略formats
      // name: '__golden__', // 'umd'时必须
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      input: './library/index.ts',
      output: [
        // 组件库默认入口文件main是传统的CommonJS模块，
        // 但是如果你的环境支持ESModule的话，构建工具会优先使用我们的module入口
        {
          format: 'es', // esm, module
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //配置打包根目录
          dir: 'lib/es',
          //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot: 'src'
        },
        {
          format: 'cjs', // CommonJS
          entryFileNames: '[name].js',
          //配置打包根目录
          dir: 'lib/lib',
          //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot: 'src'
        }
      ]
    }
  }
})
