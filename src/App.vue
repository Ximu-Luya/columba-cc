<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
// import { darkTheme, NConfigProvider } from 'naive-ui'
</script>

<template>
  <!-- 默认使用暗色模式组件 -->
  <!-- <NConfigProvider :theme="darkTheme">
    
  </NConfigProvider> -->
  <div class="h-full flex-col flex">
    <section class="flex-grow">
      <RouterView />
    </section>
    <NavBar />
  </div>
</template>

<style scoped>

</style>
