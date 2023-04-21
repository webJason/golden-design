<template>
    <div class="container">
        <h1>组件测试</h1>
        <GButton
            @click="testClick"
        />
        <hello-world :msg="'全局注册'"></hello-world>
    </div>
</template>
<script lang="ts" setup>
// import { showMsg } from '../library/index' //  HelloWorld,
// import gg from '../library/index'
const testClick = (v) => {
    alert(v.value)
}
// showMsg()
// gg.showMsg()
</script>
