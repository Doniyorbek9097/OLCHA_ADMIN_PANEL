<template>
  <q-layout view="lHr LPR lfr">
    <q-page-container :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

</script>

<style>

</style>
