import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/master/TADashboardView.vue'
import CourseView from '@/views/CourseView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HomeView from '@/views/HomeView.vue'
import NotificationView from '@/views/NotificationView.vue'
import CalwageView from '@/views/CalwageView.vue'
import FormView from '@/views/FormView.vue'
import LoginView from '@/views/LoginView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/login', 
      component: LoginView 
    },
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
        {
          name: 'attendance',
          path: '/attendance', 
          component: AttendanceView
        }
      ]
    }
  ]
})

export default router