<template>
    <div>
      <h2>Select a TA</h2>
      <form @submit.prevent="fetchAttendance">
        <select v-model="selectedTA" required>
          <option disabled value="">Please select a TA</option>
          <option v-for="ta in tas" :key="ta.ta_id" :value="ta.ta_name">
            {{ ta.ta_name }}
          </option>
        </select>
        <button type="submit">Fetch Attendance History</button>
      </form>
  
      <div v-if="attendance.length">
        <h3>Attendance History</h3>
        <ul>
          <li v-for="record in attendance" :key="record.id">
            {{ record.date }}: {{ record.start_time }} - {{ record.end_time }} ({{ record.status }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tas: [],
        selectedTA: '',
        attendance: [],
      };
    },
    created() {
      this.fetchTAs();
    },
    methods: {
      async fetchTAs() {
        try {
          const response = await axios.get('http://localhost:5000/api/get_taname');
          console.log(response.data);  // Log the response to ensure data is fetched
          this.tas = response.data.tas;
        } catch (error) {
          console.error("Error fetching TAs:", error);
        }
      },
      async fetchAttendance() {
        try {
          const response = await axios.post('http://localhost:5000/api/attendance_result', {
            ta_name: this.selectedTA
          });
          this.attendance = response.data.attendance;
        } catch (error) {
          console.error("Error fetching attendance:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 20px;
  }
  
  form {
    margin-bottom: 30px;
  }
  
  button {
    margin-top: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
  