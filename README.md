# golden
开发一个组件库

### Compile and Hot-Reload for Development

```sh
npm install
npm run dev
npm run lint
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
## package.json
```json
{
  "dependencies": {
    "vue-demi": "latest"
  },
  "peerDependencies": {
    "@vue/composition-api": "~1.7.1",
    "vue": "^2.0.0 || >=3.0.0"
  },
  "peerDependenciesMeta": {
    "@vue/composition-api": {
      "optional": true
    }
  },
  "devDependencies": {
    "vue": "^3.2.47",
  }
}
```

## 插件
### unplugin-vue-define-options
在setup中使用defineOptions() 定义组件name

## 记录
1. vue-demi 利用了 NPM 的 postinstall 钩子。当用户安装所有包后，脚本将开始检查已安装的 Vue 版本，并根据 Vue 版本返回对应的代码。在使用 Vue2 时，如果没有安装 @vue/composition-api，它也会自动安装。
2. 找不到"./xx.vue" => ts默认不支持.vue类型的模块 => 添加模块类型定义 env.d.ts
3. Vue.use()或app.use() 参数类型必须是 Object 或 Function，如果是 Object 那么这个 Object 需要定义一个 install 方法，如果是 Function 那么这个函数就被当做 install 方法。