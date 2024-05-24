<template>
  <div class="ta-check-attendance">
    <h1>TA Check Attendance</h1>
    <form @submit.prevent="submitCheckIn">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model.trim="checkInData.date" required>

      <label for="startTime">Start Time:</label>
      <input type="time" id="startTime" v-model.trim="checkInData.startTime" required>

      <label for="endTime">End Time:</label>
      <input type="time" id="endTime" v-model.trim="checkInData.endTime" required>
      <button class="btn btn-active btn-secondary" type="submit" :disabled="loading">
        <span v-if="loading">Processing...</span>
        <span v-else>Check Attendance</span>
      </button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>

    <h1 >Your Attendance</h1>
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
      // Validate that the start time is before the end time
      if (this.checkInData.startTime >= this.checkInData.endTime) {
        this.message = "Start Time must be before End Time";
        return;
      }
      
      this.loading = true;
      // Adjust the URL below to match your Flask app's location and port
      axios.post('http://localhost:5000/api/ta/check-in', this.checkInData)
        .then(response => {
          if (response.data && response.status === 201) {
            this.message = 'Attendance recorded successfully. Waiting for approval.';
            this.checkIns.push({ ...this.checkInData, status: 'Pending' });
            this.checkInData = { date: '', startTime: '', endTime: '' };
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
    },

    fetchCheckIns() {
      // Adjust the URL below to match your Flask app's location and port
      axios.get('http://localhost:5000/api/ta/check-ins')
        .then(response => {
          if (response.data && response.status === 200) {
            this.checkIns = response.data.check_ins;
          } else {
            console.error('Unexpected response structure when fetching check-ins:', response);
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
