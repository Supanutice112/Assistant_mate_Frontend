import { createRouter, createWebHistory } from 'vue-router'
import TADashboardView from '@/views/master/TADashboardView.vue'
import CourseView from '@/views/CourseView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HomeView from '@/views/HomeView.vue'
import NotificationView from '@/views/NotificationView.vue'
import CalwageView from '@/views/CalwageView.vue'
import FormView from '@/views/FormView.vue'
import LoginView from '@/views/LoginView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import TeacherNotificationView from '@/views/TeacherNotificationView.vue'

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
      name: 'tadashboard',
      component: TADashboardView,
      children: [
        {
          name: 'home',
          path: 'home',  // Relative to '/'. This is now '/home'
          component: HomeView
        },
        {
          name: 'course',
          path: 'course',  // This is now '/course'
          component: CourseView 
        },
        {
          name: 'profile',
          path: 'profile',  // This is now '/profile'
          component: ProfileView 
        },
        {
          name: 'notification',
          path: 'notification',  // This is now '/notification'
          component: NotificationView 
        },
        {
          name: 'calwage',
          path: 'calwage',  // This is now '/calwage'
          component: CalwageView 
        },
        {
          name: 'form',
          path: 'form',  // This is now '/form'
          component: FormView 
        },
        {
          name: 'attendance',
          path: 'attendance/:id',  // Updated path with parameter `id`
          component: AttendanceView,
          props: true  // Enables route parameter props
        },
        {
          name: 'Teachernotification',
          path: 'Teachernotification',  // This is now '/Teachernotification'
          component: TeacherNotificationView
        },
      ]
    }
  ]
})

export default router
