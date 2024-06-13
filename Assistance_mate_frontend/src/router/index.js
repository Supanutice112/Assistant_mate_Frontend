import { createRouter, createWebHistory } from 'vue-router'
import TADashboardView from '@/views/master/TADashboardView.vue'
import CourseView from '@/views/TA/CourseView.vue'
import ProfileView from '@/views/TA/ProfileView.vue'
import HomeView from '@/views/TA/HomeView.vue'
import NotificationView from '@/views/TA/NotificationView.vue'
import CalwageView from '@/views/TA/CalwageView.vue'
import FormView from '@/views/TA/FormView.vue'
import LoginView from '@/views/LoginView.vue'
import AttendanceView from '@/views/TA/AttendanceView.vue'
import TaNotificationView from '@/views/TA/TaNotificationView.vue'
import TeacherDashboardView from '@/views/master/TeacherDashboardView.vue'
import TeacherHomeView from '@/views/Teacher/TeacherHomeView.vue'
import TeacherCourseView from '@/views/Teacher/TeacherCourseView.vue'
import TeacherNotificationView from '@/views/Teacher/TeacherNotificationView.vue'
import TeacherEvaluateView from '@/views/Teacher/TeacherEvaluateView.vue'
import TeacherProfileView from '@/views/Teacher/TeacherProfileView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/', 
      component: LoginView 
    },
    {
      path: '/tadashboard',
      name: 'tadashboard',
      component: TADashboardView,
      children: [
        {
          name: 'tahome',
          path: '/tahome',  // Relative to '/'. This is now '/home'
          component: HomeView
        },
        {
          name: 'tacourse',
          path: '/tacourse',  // This is now '/course'
          component: CourseView 
        },
        {
          name: 'taprofile',
          path: '/taprofile',  // This is now '/profile'
          component: ProfileView 
        },
        {
          name: 'tanotification',
          path: '/tanotification',  // This is now '/notification'
          component: NotificationView 
        },
        {
          name: 'tacalwage',
          path: '/tacalwage',  // This is now '/calwage'
          component: CalwageView 
        },
        {
          name: 'form',
          path: '/form',  // This is now '/form'
          component: FormView 
        },
        {
          name: 'attendance',
          path: '/attendance/:id',  // Updated path with parameter `id`
          component: AttendanceView,
          props: true  // Enables route parameter props
        },
        {
          name: 'Tanotification',
          path: '/Tanotification',  // This is now '/Teachernotification'
          component: TaNotificationView
        },
      ]
    },
    {
      path: '/teacherdashboard',
      name: 'teacherdashboard',
      component: TeacherDashboardView,
      children: [
        {
          name: 'teacherhome',
          path: '/teacherhome',  // Relative to '/'. This is now '/home'
          component: TeacherHomeView
        },
        {
          name: 'teachercourse',
          path: '/teachercourse',  // Relative to '/'. This is now '/home'
          component: TeacherCourseView
        },
        {
          name: 'teacherprofile',
          path: '/teacherprofile',  // Relative to '/'. This is now '/home'
          component: TeacherProfileView
        },
        {
          name: 'teacherevaluate',
          path: '/teacherevaluate',  // Relative to '/'. This is now '/home'
          component: TeacherEvaluateView
        },
        {
          name: 'teachernotification',
          path: '/teachernotification',  // Relative to '/'. This is now '/home'
          component: TeacherNotificationView
        },
      ]
    }
  ]
})

export default router
