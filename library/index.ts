import * as components from './components/entry'
// import * as utils from './utils'

// import { isVue2, isVue3, version, defineProps } from 'vue-demi'
// console.log(isVue2, isVue3, defineProps)

console.log(components)
const install = function (_vue) {
    // console.log(_vue)
    Object.values(components).forEach(comp => {
        if (!comp) {
            return;
        }
        const name = comp.name || comp.__name
        _vue.component(name, comp)
    });
}
const plugin = {
    // ...utils,
    install // 必须提供install方法 供use使用
}
export * from './components/entry'
export * from './utils'
export default plugin;
