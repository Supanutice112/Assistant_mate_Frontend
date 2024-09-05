import { createRouter, createWebHistory } from 'vue-router'
import TADashboardView from '@/views/master/TADashboardView.vue'
import CourseView from '@/views/TA/CourseView.vue'
import ProfileView from '@/views/TA/ProfileView.vue'
import HomeView from '@/views/TA/HomeView.vue'
import NotificationView from '@/views/TA/NotificationView.vue'
import CalwageView from '@/views/TA/CalwageView.vue'
import FormView from '@/views/TA/SummaryView.vue'
import LoginView from '@/views/LoginView.vue'
import AttendanceView from '@/views/TA/AttendanceView.vue'
import TaNotificationView from '@/views/TA/TaNotificationView.vue'
import TeacherDashboardView from '@/views/master/TeacherDashboardView.vue'
import TeacherHomeView from '@/views/Teacher/TeacherHomeView.vue'
import TeacherCourseView from '@/views/Teacher/TeacherCourseView.vue'
import TeacherNotificationView from '@/views/Teacher/TeacherNotificationView.vue'
import TeacherEvaluateView from '@/views/Teacher/TeacherEvaluateView.vue'
import TeacherProfileView from '@/views/Teacher/TeacherProfileView.vue'
import ViewAttendanceView from '@/views/TA/ViewAttendanceView.vue'
import TeachercancelationView from '@/views/Teacher/TeachercancelationView.vue'
import UnderformView from '@/views/TA/UnderformView.vue'
import GraformView from '@/views/TA/GraformView.vue'
import TeacherLoginView from '@/views/TeacherLoginView.vue'
import TaLoginView from '@/views/TaLoginView.vue'
import StaffDashboardView from '@/views/master/StaffDashboardView.vue'
import StudentDashboardView from '@/views/master/StudentDashboardView.vue'
import StaffHomeView from '@/views/Staff/StaffHomeView.vue'
import StudentHomeView from '@/views/Student/StudentHomeView.vue'
import StaffLoginView from '@/views/StaffLoginView.vue'
import StudentLoginView from '@/views/StudentLoginView.vue'
import StudentProfile from '@/views/Student/StudentProfile.vue'
import StudentEvaluate from '@/views/Student/StudentEvaluate.vue'
import EvaluateResultView from '@/views/Staff/EvaluateResultView.vue'
import TAlistView from '@/views/Staff/TAlistView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/', 
      component: LoginView 
    },
    {
      name: 'Teacherlogin',
      path: '/TeacherLogin', 
      component: TeacherLoginView 
    },
    {
      name: 'Studentlogin',
      path: '/Studentlogin', 
      component: StudentLoginView 
    },
    {
      name: 'Stafflogin',
      path: '/Stafflogin', 
      component: StaffLoginView 
    },
    {
      name: 'TaLogin',
      path: '/TaLogin', 
      component: TaLoginView 
    },
    {
      name: 'underform',
      path: '/underformview', 
      component: UnderformView 
    },
    {
      name: 'graform',
      path: '/graformview', 
      component: GraformView 
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
        {
          name: 'taviewattendance',
          path: '/taviewattendance',  // This is now '/Teachernotification'
          component: ViewAttendanceView
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
          path: '/cancel/:courseId',
          name: 'TeachercancelationView',
          component: TeachercancelationView,
        },
        {
          name: 'teachernotification',
          path: '/teachernotification',  // Relative to '/'. This is now '/home'
          component: TeacherNotificationView
        },
      ]
    },



    {
      path: '/studentdashboard',
      name: 'studentdashboard',
      component: StudentDashboardView,
      children: [
        {
          name: 'studenthome',
          path: '/studenthome',  // Relative to '/'. This is now '/home'
          component: StudentHomeView
        },
        {
          name: 'studentprofile',
          path: '/studentprofile',  // Relative to '/'. This is now '/home'
          component: StudentProfile
        },
        {
          name: 'studentevaluate',
          path: '/studentevaluate',  // Relative to '/'. This is now '/home'
          component: StudentEvaluate
        },
      ]
    },
    {
      path: '/staffdashboard',
      name: 'staffdashboard',
      component: StaffDashboardView,
      children: [
        {
          name: 'staffhome',
          path: '/staffhome',  // Relative to '/'. This is now '/home'
          component: StaffHomeView
        },
        {
          name: 'evaluateresult',
          path: '/evaluateresult',
          component: EvaluateResultView
        },
        {
          name: 'talist',
          path: '/talist',
          component: TAlistView
        },
      ]
    }
  ]
})

export default router
