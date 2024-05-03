import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/master/DashboardView.vue'
import CourseView from '@/views/CourseView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HomeView from '@/views/HomeView.vue'
import NotificationView from '@/views/NotificationView.vue'
import CalwageView from '@/views/CalwageView.vue'
import FormView from '@/views/FormView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          name: 'home',
          path: '/home', 
          component: HomeView
        },
        {
          name: 'course',
          path: '/course', 
          component: CourseView 
        },
        {
          name: 'profile',
          path: '/profile', 
          component: ProfileView 
        },
        {
          name: 'notification',
          path: '/notification', 
          component: NotificationView 
        },
        {
          name: 'calwage',
          path: '/calwage', 
          component: CalwageView 
        },
        {
          name: 'form',
          path: '/form', 
          component: FormView 
        },
      ]
    }
  ]
})

export default router