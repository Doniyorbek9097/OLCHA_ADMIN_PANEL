<template>
 <q-btn @click="DarkModeBtn" flat :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'" fab-mini />
</template>

<script setup>
import { useQuasar } from 'quasar';
const $q = useQuasar();
localStorage.isDarkMode ? localStorage.isDarkMode : localStorage.isDarkMode = false; 

const DarkModeBtn = () => {
   $q.dark.toggle();
  if ($q.dark.isActive) {
    localStorage.isDarkMode = JSON.stringify(true);
  } else {
    localStorage.isDarkMode = JSON.stringify(false);
  }
}

$q.dark.set(JSON.parse(localStorage.isDarkMode));

</script>

<style lang="scss" scoped>

</style>