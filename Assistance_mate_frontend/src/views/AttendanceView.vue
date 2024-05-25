<template>
  <div class="ta-check-attendance">
    <div class="current-time">Current Time: {{ currentTime }}</div>
    <h1>TA Check Attendance</h1>
    <form @submit.prevent="submitCheckIn">
      <button class="btn btn-active btn-secondary" type="submit" :disabled="loading || alreadyCheckedIn">
        <span v-if="loading">Processing...</span>
        <span v-else>Check Attendance</span>
      </button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
    <h1>Your Attendance</h1>
    <ul v-if="checkIns.length > 0">
      <li v-for="(record, index) in checkIns" :key="index">
        <p><strong>Date:</strong> {{ record.date }}</p>
        <p><strong>Start Time:</strong> {{ record.startTime }}</p>
        <p><strong>End Time:</strong> {{ record.endTime }}</p>
        <p><strong>Status:</strong> {{ record.status }}</p>
      </li>
    </ul>
    <p v-else>No Attendance recorded.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TACheckAttendanceView',
  data() {
    return {
      currentTime: new Date().toLocaleTimeString(),
      checkIns: [],
      loading: false,
      message: '',
      alreadyCheckedIn: false
    };
  },
  methods: {
    updateClock() {
      this.currentTime = new Date().toLocaleTimeString();
    },
    submitCheckIn() {
      const now = new Date();
      const checkInData = {
        date: now.toISOString().split('T')[0],
        startTime: now.toISOString().split('T')[1].slice(0, 8),
        endTime: new Date(now.getTime() + 30*60000).toISOString().split('T')[1].slice(0, 8)
      };

      this.loading = true;
      axios.post('http://127.0.0.1:5000/api/ta/check_attendance', checkInData)
        .then(response => {
          if (response.data && response.status === 201) {
            this.message = 'Attendance recorded successfully. Waiting for approval.';
            this.checkIns.push({ ...checkInData, status: 'Pending' });
            this.alreadyCheckedIn = true;
          } else if (response.status === 409) {
            this.message = 'Attendance already recorded today.';
            this.alreadyCheckedIn = true;
          } else {
            this.message = 'Unexpected response from the server. Please try again.';
          }
        })
        .catch(error => {
          console.error('Error while submitting check-in:', error);
          this.message = 'Error recording check-in: ' + (error.response && error.response.data ? error.response.data.message : error.message);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.updateClock();
    this.interval = setInterval(this.updateClock, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.current-time {
  text-align: center;
  font-size: 24px;
  padding: 10px;
  color: #333;
}
.ta-check-attendance {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
button {
  width: 100%;
  padding: 8px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
li {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
}
</style>
