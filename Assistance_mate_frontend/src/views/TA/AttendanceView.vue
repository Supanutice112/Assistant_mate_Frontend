<template>
  <div class="container mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-semibold mb-6 text-center">TA Check Attendance for Course ID: {{ courseId }}</h1>
    <form @submit.prevent="submitCheckIn" class="space-y-4">
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date:</label>
        <input type="date" id="date" v-model="checkInData.date" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
      </div>

      <div>
        <label for="startTime" class="block text-sm font-medium text-gray-700">Start Time:</label>
        <input type="time" id="startTime" v-model="checkInData.startTime" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
      </div>

      <div>
        <label for="endTime" class="block text-sm font-medium text-gray-700">End Time:</label>
        <input type="time" id="endTime" v-model="checkInData.endTime" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
      </div>

      <p v-if="timeError" class="text-red-600 text-sm">Start Time must be before End Time.</p>

      <button type="submit" :disabled="loading" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <span v-if="loading">Processing...</span>
        <span v-else>Check Attendance</span>
      </button>
    </form>

    <p v-if="message" :class="{'text-center mt-4 font-semibold': true, 'text-green-600': success, 'text-red-600': !success}">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      checkInData: {
        course_id: '',  // Ensure this matches the backend field name
        date: '',
        startTime: '',
        endTime: ''
      },
      loading: false,
      message: '',
      success: false,
      timeError: false
    };
  },
  computed: {
    courseId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.checkInData.course_id = this.courseId;
  },
  methods: {
    validateTimes() {
      if (this.checkInData.startTime >= this.checkInData.endTime) {
        this.timeError = true;
        return false;
      } else {
        this.timeError = false;
        return true;
      }
    },
    async submitCheckIn() {
      if (!this.validateTimes()) {
        this.message = 'Please correct the errors and try again.';
        this.success = false;
        return;
      }
      this.loading = true;
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/checkin', {
          course_id: this.checkInData.course_id,  // Ensure this matches the backend field name
          date: this.checkInData.date,
          startTime: this.checkInData.startTime,
          endTime: this.checkInData.endTime
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        this.message = response.data.message;
        this.success = true;
        this.checkInData.date = '';
        this.checkInData.startTime = '';
        this.checkInData.endTime = '';
      } catch (error) {
        this.message = 'Failed to check in attendance. ' + (error.response ? error.response.data.error : '');
        this.success = false;
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
