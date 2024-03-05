import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quotation',
      name: 'quotation',
      // 路由级别的代码拆分
      // 这将为该路由生成一个单独的块（About.[hash].js）
      // 当访问该路由时，该块将被延迟加载。
      component: () => import('../views/Quotation/Index.vue')
    }
  ]
})

export default router
