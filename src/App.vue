<script setup>
import { useQuasar } from 'quasar';
const $q = useQuasar();
localStorage.isGrid ? localStorage.isGrid : localStorage.isGrid = false; 

</script>


<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
