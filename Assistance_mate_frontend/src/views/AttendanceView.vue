<template>
  <div>
    <h1>TA Check Attendance</h1>
    <form @submit.prevent="submitCheckIn">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="checkInData.date" required>

      <label for="startTime">Start Time:</label>
      <input type="time" id="startTime" v-model="checkInData.startTime" required>

      <label for="endTime">End Time:</label>
      <input type="time" id="endTime" v-model="checkInData.endTime" required>

      <button type="submit" :disabled="loading">
        <span v-if="loading">Processing...</span>
        <span v-else>Check Attendance</span>
      </button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      checkInData: {
        date: '',
        startTime: '',
        endTime: ''
      },
      loading: false,
      message: ''
    };
  },
  methods: {
    submitCheckIn() {
      this.loading = true;
      axios.post('http://localhost:5000/api/checkin', this.checkInData)
        .then(response => {
          this.loading = false;
          this.message = response.data.message;
          // Optionally, reset the form
          this.checkInData.date = '';
          this.checkInData.startTime = '';
          this.checkInData.endTime = '';
        })
        .catch(error => {
          this.loading = false;
          this.message = 'Failed to check in attendance.';
          console.error(error);
        });
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
li {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
}
.message {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
