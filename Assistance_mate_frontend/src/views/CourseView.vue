<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Professor</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Dynamic rows based on courses data -->
          <tr v-for="(course, index) in courses" :key="course.id">
            <th>{{ index + 1 }}</th>
            <td>
              <div class="flex items-center gap-3">
                <div>
                  <div class="font-bold">{{ course.name }}</div>
                  <div class="text-sm opacity-50">{{ course.id }}</div>
                </div>
              </div>
            </td>
            <td>
              {{ course.professor }}
              <br />
              <span 
                class="badge badge-ghost badge-sm"
                :class="{'badge-accent': course.international, 'badge-info': !course.international}"
              >
                {{ course.international ? 'International' : 'Thai' }}
              </span>
            </td>
            <td>{{ course.time }}</td>
            <td>
              <router-link :to="'/attendance/' + course.id">
                <button class="btn btn-ghost btn-xs">Attendance</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseTable',
  data() {
    return {
      //สร้างdataทดลอง01
      courses: [
        {  
          name: 'PROGRAMMING LOGICAL THINKING',
          id: '511021',
          professor: 'Supanut Maneeyot',
          time: '11:00 AM - 13:00 PM',
          international: true,
        },
        {
          name: 'DATA STRUCTURES',
          id: '511022',
          professor: 'John Doe',
          time: '10:00 AM - 12:00 PM',
          international: false,
        },
      ],
    };
  },
  methods: {
    // Add methods to handle different actions
    goToAttendance(courseId) {
      this.$router.push(`/attendance/${courseId}`);
    },
  },
};
</script>
