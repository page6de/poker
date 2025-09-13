import HomeView from '@/views/HomeView.vue'
import RoomView from '@/views/RoomView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: RoomView
    }
  ],
})

export default router
