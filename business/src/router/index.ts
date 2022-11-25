import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/views/test',
    },
    {
      path: '/views',
      component: Layout,
      children: [
        {
          path: 'test',
          name: 'test',
          component: () => import('@/views/TestView')
        }
      ]
    },
    {
      path: '/calculator',
      component: Layout,
      children: [
        {
          path: 'tie',
          name: 'tie',
          component: () => import('@/views/calculator/Tie')
        }
      ]
    }
  ]
})

export default router
