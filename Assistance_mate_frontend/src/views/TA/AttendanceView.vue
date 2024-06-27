<template>
  <div>
    <h1>TA Check Attendance for Course ID: {{ courseId }}</h1>
    <form @submit.prevent="submitCheckIn">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="checkInData.date" required>

      <label for="startTime">Start Time:</label>
      <input type="time" id="startTime" v-model="checkInData.startTime" required>

      <label for="endTime">End Time:</label>
      <input type="time" id="endTime" v-model="checkInData.endTime" required>

      <p v-if="timeError" class="error">Start Time must be before End Time.</p>

      <button type="submit" :disabled="loading">
        <span v-if="loading">Processing...</span>
        <span v-else>Check Attendance</span>
      </button>
    </form>

    <p v-if="message" :class="{'message': true, 'success': success, 'error': !success}">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      checkInData: {
        course_id: '',
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
      course_id: this.courseId,
      date: this.checkInData.date,
      startTime: this.checkInData.startTime,
      endTime: this.checkInData.endTime
    }, {
      withCredentials: true, // Ensure credentials are sent
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
input, button {
  padding: 8px;
  margin-top: 5px;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  margin-top: 20px;
  font-weight: bold;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>