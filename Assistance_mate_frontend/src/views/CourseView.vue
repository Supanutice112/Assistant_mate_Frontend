<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table w-full ">
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
                  <div class="font-bold">{{ course.course_name }}</div>
                  <div class="text-sm opacity-50">{{ course.id }}</div>
                </div>
              </div>
            </td>
            <td>
              {{ course.professor }}
              <br />
              <span 
                class="badge badge-ghost badge-sm"
                :class="{'badge-accent': course.section, 'badge-info': !course.section}"
              >
                section: {{ course.section }}
              </span>
            </td>
            <td>{{ course.course_time }}</td>
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
import axios from 'axios';
export default {
  name: 'CoursePage',
  data() {
    return {
      courses: [],
    };
  },
  async created() {
    await this.getCourses();
  },
  methods: {
    async getCourses() {
      const path = 'http://127.0.0.1:5000/api/courses';
      try {
        const response = await axios.get(path);
        this.courses = response.data.courses; // Now should correctly populate
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        alert('Failed to load courses. Please try again later.');
      }
    },
  },
};
</script>