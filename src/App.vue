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
    <section class="page-wrapper flex-grow flex-shrink overflow-y-auto p-3">
      <RouterView />
    </section>
    <NavBar />
  </div>
</template>

<style scoped>
.page-wrapper {
  background-color: #F6F6F6;
}
</style>
