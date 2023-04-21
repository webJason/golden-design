import { createApp } from 'vue'
// 根组件
import App from './App.vue'
// 引入组件库
import Golden from '../library'
// import Golden from '../lib/index.mjs'
console.log(Golden);
const app = createApp(App)
// 在挂载之前 注册组件
app.use(Golden)
// 挂载应用
app.mount('#app')
console.log(app)