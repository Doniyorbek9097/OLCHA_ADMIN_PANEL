<template>
  <q-btn flat round dense :icon="grid ? 'apps' : 'list'" class="q-mr-xs" @click="Changed" />
</template>

<script setup>
import {ref} from "vue"
const props = defineProps({
    modelValue:{
        type:Boolean,
        default:false
    }
});

const emits =  defineEmits(["update:modelValue"]);
const grid = ref(JSON.parse(localStorage.isGrid));

const Changed = () => {
    grid.value = !grid.value;
    emits('update:modelValue', grid.value);
    localStorage.isGrid = JSON.stringify(grid.value);
}

</script>

<style lang="scss" scoped>

</style>