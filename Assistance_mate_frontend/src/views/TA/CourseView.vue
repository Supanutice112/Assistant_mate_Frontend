<template>
  <div class="container mx-auto p-6">
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full bg-white border border-gray-200">
        <!-- Table Head -->
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="py-3 px-6">#</th>
            <th class="py-3 px-6">Course</th>
            <th class="py-3 px-6">Professor</th>
            <th class="py-3 px-6">Time</th>
            <th class="py-3 px-6">Action</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr v-for="(course, index) in displayedCourses" :key="course.id" class="border-t">
            <td class="py-3 px-6">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="py-3 px-6">
              <div class="flex flex-col">
                <span class="font-semibold">{{ course.course_name }}</span>
                <span class="text-sm text-gray-500">{{ course.courseid }}</span>
              </div>
            </td>
            <td class="py-3 px-6">
              {{ course.Teacher_name }}
              <br />
              <span 
                class="badge text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-800"
                :class="{'bg-green-100 text-green-800': course.section, 'bg-blue-100 text-blue-800': !course.section}"
              >
                Section: {{ course.section }}
              </span>
            </td>
            <td class="py-3 px-6">{{ course.course_time }}</td>
            <td class="py-3 px-6">
              <router-link :to="'/attendance/' + course.courseid">
                <button class="btn btn-primary btn-sm">Attendance</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between mt-4">
      <button class="btn btn-outline-primary" @click="prevPage" :disabled="currentPage === 1">
        Previous Page
      </button>
      <button class="btn btn-outline-primary" @click="nextPage" :disabled="currentPage * pageSize >= courses.length">
        Next Page
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      courses: [],
      displayedCourses: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  async created() {
    await this.fetchMyCourses();
  },
  methods: {
    async fetchMyCourses() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/my_courses', {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        this.courses = response.data.courses;
        this.displayedCourses = this.paginate(this.courses, this.currentPage, this.pageSize);
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Failed to fetch courses.');
      }
    },
    paginate(array, page, size) {
      const start = (page - 1) * size;
      const end = page * size;
      return array.slice(start, end);
    },
  },
  watch: {
    currentPage() {
      this.displayedCourses = this.paginate(this.courses, this.currentPage, this.pageSize);
    },
    pageSize() {
      this.displayedCourses = this.paginate(this.courses, this.currentPage, this.pageSize);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  padding: 1rem;
  text-align: center; /* Center the text in headers */
}

.table td {
  padding: 1rem;
  text-align: center; /* Center the text in table cells */
}

.table tbody tr {
  border-bottom: 1px solid #dee2e6;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
  text-align: center;
  width: auto;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.btn-outline-primary {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-primary:hover,
.btn-outline-primary:hover {
  background-color: #0056b3;
  color: white;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.text-gray-500 {
  color: #a0aec0;
}

.text-gray-700 {
  color: #4a5568;
}

.text-blue-800 {
  color: #2c5282;
}

.bg-blue-100 {
  background-color: #ebf8ff;
}

.bg-green-100 {
  background-color: #f0fff4;
}

.text-green-800 {
  color: #2f855a;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.mt-4 {
  margin-top: 1rem;
}
</style>