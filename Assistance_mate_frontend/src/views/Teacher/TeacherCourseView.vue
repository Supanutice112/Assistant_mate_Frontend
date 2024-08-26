<template>
  <div class="p-4">
    <div class="overflow-x-auto rounded-lg shadow-md">
      <table class="table-auto w-full bg-white">
        <!-- head -->
        <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th class="py-3 px-6 text-left">#</th>
            <th class="py-3 px-6 text-left">Course</th>
            <th class="py-3 px-6 text-left">Professor</th>
            <th class="py-3 px-6 text-left">Time</th>
            <th class="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <!-- Dynamic rows based on courses data -->
          <tr v-for="(course, index) in displayedCourses" :key="course.course_id" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <div class="flex items-center">
                <span>{{ (currentPage - 1) * pageSize + index + 1 }}</span>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center gap-3">
                <div>
                  <div class="font-bold text-gray-900">{{ course.course_name }}</div>
                  <div class="text-sm text-gray-500">{{ course.courseid }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              {{ course.Teacher_name }}
              <br />
              <span 
                class="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1"
              >
                section: {{ course.section }}
              </span>
            </td>
            <td class="py-3 px-6 text-left">
              {{ course.course_time }}
            </td>
            <td class="py-3 px-6 text-left">
              <router-link :to="'/cancel/' + course.courseid">
                <button class="text-white bg-red-500 hover:bg-red-600 rounded-full px-4 py-2 text-xs focus:outline-none">cancel</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between mt-4">
      <button 
        class="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg focus:outline-none"
        @click="prevPage" 
        :disabled="currentPage === 1">
        Previous Page
      </button>
      <button 
        class="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg focus:outline-none"
        @click="nextPage" 
        :disabled="currentPage * pageSize >= courses.length">
        Next Page
      </button>
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

<style scoped>
/* Styling for the table */
.table-auto {
  border-collapse: separate;
  border-spacing: 0 15px;
}

.table-auto thead tr {
  background-color: #f8f9fa;
}

.table-auto tbody tr {
  transition: background-color 0.2s;
}

.table-auto tbody tr:hover {
  background-color: #f1f5f9;
}

button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
