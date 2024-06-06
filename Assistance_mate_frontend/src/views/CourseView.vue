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
          <tr v-for="(course, index) in displayedCourses" :key="course.courseid">
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
              <router-link :to="'/attendance/' + course.courseid">
                <button class="btn btn-ghost btn-xs">Attendance</button>
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
          withCredentials: true, // Ensure credentials are sent
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Assuming token is stored in localStorage
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
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.mt-4 {
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:disabled {
  background-color: #007bff;
  opacity: 0.5;
}

.btn-ghost {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.btn-xs {
  font-size: 0.75rem;
}
</style>
