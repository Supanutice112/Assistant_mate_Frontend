<template>
  <div class="ta-check-attendance">
    <h1>TA Check Attendance</h1>
    <form @submit.prevent="submitCheckIn">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="checkInData.date" required>

      <label for="startTime">Start Time:</label>
      <input type="time" id="startTime" v-model="checkInData.startTime" required>

      <label for="endTime">End Time:</label>
      <input type="time" id="endTime" v-model="checkInData.endTime" required>

      <button type="submit" :disabled="loading">Check In</button>
    </form>

    <p v-if="message">{{ message }}</p>

    <h2>Your Check-ins</h2>
    <ul>
      <li v-for="(record, index) in checkIns" :key="index">
        <p><strong>Date:</strong> {{ record.date }}</p>
        <p><strong>Start Time:</strong> {{ record.startTime }}</p>
        <p><strong>End Time:</strong> {{ record.endTime }}</p>
        <p><strong>Status:</strong> {{ record.status }}</p>
      </li>
    </ul>
    <p v-if="checkIns.length === 0">No check-ins recorded.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TACheckAttendanceView',
  data() {
    return {
      checkInData: {
        date: '',
        startTime: '',
        endTime: ''
      },
      checkIns: [],
      loading: false,
      message: ''
    };
  },
  methods: {
  submitCheckIn() {
    this.loading = true;
    axios.post('/api/ta/check-in', this.checkInData)
      .then(response => {
        if (response && response.data) {
          this.message = 'Check-in recorded successfully. Waiting for approval.';
          // Push the submitted data into checkIns array
          this.checkIns.push({ ...this.checkInData, status: 'Pending' });
          // Reset form
          this.checkInData = { date: '', startTime: '', endTime: '' };
        } else {
          console.log('Unexpected response structure:', response);
          this.message = 'Unexpected response structure. Please check the console for more details.';
        }
      })
      .catch(error => {
        console.log('Error while submitting check-in:', error);
        this.message = 'Error recording check-in: ' + (error.response && error.response.data ? error.response.data.message : error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  },

    fetchCheckIns() {
      axios.get('')
        .then(response => {
          if (response && response.data) {
            this.checkIns = response.data;
          } else {
            console.log('Unexpected response structure when fetching check-ins:', response);
          }
        })
        .catch(error => {
          console.error('Error fetching check-ins:', error);
        });
    }
  },
  created() {
    this.fetchCheckIns();
  }
};
</script>

<style scoped>
.ta-check-attendance {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
label {
  display: block;
  margin-top: 10px;
}
input, button {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
li {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
}
</style>
