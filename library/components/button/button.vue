<template>
    <button
        :class="[
            'g-button',
            type
        ]"
        @click="handleClick"
    >
        按钮
    </button>
</template>
<script lang="ts" setup>
import { ref } from 'vue-demi'
defineOptions({
    name: 'GButton'
})

const props = defineProps({
    type: String
})
const emit = defineEmits(['click'])

const value = ref(0)
const handleClick = () => {
    emit('click', value)
}
</script>
