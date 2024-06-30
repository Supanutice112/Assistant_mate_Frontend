<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table w-full">
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
          <tr v-for="(course, index) in displayedCourses" :key="course.course_id">
            <th>{{ (currentPage - 1) * pageSize + index + 1 }}</th>
            <td>
              <div class="flex items-center gap-3">
                <div>
                  <div class="font-bold">{{ course.course_name }}</div>
                  <div class="text-sm opacity-50">{{ course.courseid }}</div>
                </div>
              </div>
            </td>
            <td>
              {{ course.Teacher_name }}
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
              <router-link :to="'/cancel/' + course.courseid">
                <button class="btn btn-ghost btn-xs bg-red-400">cancel</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between mt-4">
      <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Previous Page</button>
      <button class="btn btn-primary" @click="nextPage" :disabled="currentPage * pageSize >= courses.length">Next Page</button>
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
      currentPage: 1,
      pageSize: 8, // Change page size to 8
    };
  },
  computed: {
    displayedCourses() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.courses.slice(startIndex, endIndex);
    },
  },
  async created() {
    await this.getCourses();
  },
  methods: {
    async getCourses() {
      const path = 'http://127.0.0.1:5000/api/teacher_courses';
      const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage

      try {
        const response = await axios.get(path, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.courses = response.data.courses; // Now should correctly populate
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        alert('Failed to load courses. Please try again later.');
      }
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.courses.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
