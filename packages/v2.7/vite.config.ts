import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2' // 2.7

import { isVue2, isVue3, version } from 'vue-demi'
console.log('-version-', version)

const path = require('path')
const resolve = (str: string) => {
  console.log(path.resolve(__dirname, str))
  return path.resolve(__dirname, str)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      vue: resolve('/node_modules/vue2.7')
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
      entry: resolve('../../library/index.ts'),
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      // input: '/library/index.ts',
      output: [
        // 组件库默认入口文件main是传统的CommonJS模块，
        // 但是如果你的环境支持ESModule的话，构建工具会优先使用我们的module入口
        {
          format: 'es', // esm, module
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //配置打包根目录
          dir: '../../lib/v2.7/es',
          //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot: 'src'
        },
        {
          format: 'cjs', // CommonJS
          entryFileNames: '[name].js',
          //配置打包根目录
          dir: '../../lib/v2.7/lib',
          //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot: 'src'
        }
      ]
    }
  }
})
