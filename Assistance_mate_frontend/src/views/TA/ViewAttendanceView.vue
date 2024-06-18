<template>
  <div>
    <h1>Attendance Records</h1>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Course ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in attendanceRecords" :key="record.id">
            <td>{{ index + 1 }}</td>
            <td>{{ record.course_id }}</td>
            <td>{{ record.date }}</td>
            <td>{{ record.start_time }}</td>
            <td>{{ record.end_time }}</td>
            <td>{{ record.status }}</td>
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
      attendanceRecords: []
    };
  },
  async created() {
    await this.fetchAttendanceRecords();
  },
  methods: {
    async fetchAttendanceRecords() {
      try {
        const response = await axios.get('http://localhost:5000/api/viewattendance');
        this.attendanceRecords = response.data.attendance.map(record => ({
          ...record,
          date: new Date(record.date).toLocaleDateString(),
          start_time: record.start_time,
          end_time: record.end_time,
        }));
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        alert('Failed to load attendance records.');
      }
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
.overflow-x-auto {
  overflow-x: auto;
}
</style>
