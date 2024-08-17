<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Attendance Records</h2>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 p-2">Course ID</th>
          <th class="border border-gray-300 p-2">Date</th>
          <th class="border border-gray-300 p-2">TA Name</th>
          <th class="border border-gray-300 p-2">Start Time</th>
          <th class="border border-gray-300 p-2">End Time</th>
          <th class="border border-gray-300 p-2">Hours Worked</th>
          <th class="border border-gray-300 p-2">Minutes Worked</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in attendance" :key="index" class="hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ record.course_id }}</td>
          <td class="border border-gray-300 p-2">{{ record.date }}</td>
          <td class="border border-gray-300 p-2">{{ record.ta_name }}</td>
          <td class="border border-gray-300 p-2">{{ record.start_time }}</td>
          <td class="border border-gray-300 p-2">{{ record.end_time }}</td>
          <td class="border border-gray-300 p-2">{{ record.hours_worked }}</td>
          <td class="border border-gray-300 p-2">{{ record.minutes_worked }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attendance: []
    };
  },
  created() {
    this.fetchAttendance();
  },
  methods: {
    async fetchAttendance() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/attendance_summary', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        this.attendance = data.attendance;
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
