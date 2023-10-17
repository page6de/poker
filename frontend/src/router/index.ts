import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/room/:roomId',
    name: 'room',
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomView.vue')
  },
  {
    path: '/guest/:roomId',
    name: 'guest',
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
