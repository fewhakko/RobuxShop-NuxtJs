<script setup>
useSeoMeta({
  title: 'Meet Nuxt',
  description: 'The Intuitive Vue Framework.'
})
</script>

<template>
  <div id="app">
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<style>
#app {
  background-color: #020420;
  color: #00DC82;
}
</style>
