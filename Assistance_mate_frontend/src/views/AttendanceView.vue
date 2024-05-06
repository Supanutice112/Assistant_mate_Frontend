<template>
  <div class="attendance-view">
    <h1>Attendance Dashboard</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-in Time</th>
            <th>Name</th>
            <th>Check-out Time</th>
            <th>Hours Worked</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in attendanceRecords" :key="record.id">
            <td>{{ record.date }}</td>
            <td>{{ record.checkIn }}</td>
            <td>{{ record.name }}</td>
            <td>{{ record.checkOut }}</td>
            <td>{{ calculateHours(record.checkIn, record.checkOut) }}</td>
            <td>{{ record.course }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      attendanceRecords: []
    };
  },
  mounted() {
    this.fetchAttendance();
  },
  methods: {
    fetchAttendance() {
      axios.get('/api/attendance')
        .then(response => {
          this.attendanceRecords = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('There was an error fetching the attendance data:', error);
          this.loading = false;
        });
    },
    editRecord(id) {
      // Navigate to edit page or handle inline edit
      console.log('Edit record', id);
    },
    calculateHours(checkIn, checkOut) {
      // Placeholder for time calculation logic
      const inTime = new Date('1970/01/01 ' + checkIn);
      const outTime = new Date('1970/01/01 ' + checkOut);
      const diff = (outTime - inTime) / (1000 * 60 * 60);
      return diff.toFixed(2); // Returns the duration in hours with two decimal places
    }
  }
};
</script>

<style scoped>
.attendance-view {
  padding: 20px;
  background-color: #f5f5f5;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
