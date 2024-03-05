<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const navList = ref([
  {
    name: '发现',
    path: '/',
    icon: 'home'
  },
  {
    name: '货物总览',
    path: '/product-list',
    icon: 'product-list'
  },
  {
    name: '行情',
    path: '/quotation',
    icon: 'quotation'
  },
  {
    name: '自选',
    path: '/pick',
    icon: 'pick'
  }
])
const activeBar = computed(() => {
  return route.path
})
</script>

<template>
  <!-- 底部导航栏 -->
  <section class="nav-bar flex bg-white h-14">
    <div v-for="item in navList" :key="item.path" class="flex-1 flex justify-center items-center">
      <router-link
        :to="item.path"
        class="flex flex-col items-center"
        :class="{'active': activeBar === item.path}"
      >
        <n-icon :size="24">{{ item.icon }}</n-icon>
        <span class="text-xs">{{ item.name }}</span>
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.nav-bar {
  border-top: 1px solid #f0f0f0;

  .active {
    color: #1989fa;
  }
}
</style>