<template>
  <div class="h-full bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-8 text-center text-primary">Attendance History</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-sm">#</th>
            <th class="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-sm">Course ID</th>
            <th class="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-sm">Date</th>
            <th class="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-sm">Start Time</th>
            <th class="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-sm">End Time</th>
            <th class="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in attendanceRecords" :key="record.id" class="border-t hover:bg-gray-100 even:bg-gray-50">
            <td class="py-4 px-6">{{ index + 1 }}</td>
            <td class="py-4 px-6">{{ record.course_id }}</td>
            <td class="py-4 px-6">{{ record.date }}</td>
            <td class="py-4 px-6">{{ record.start_time }}</td>
            <td class="py-4 px-6">{{ record.end_time }}</td>
            <td class="py-4 px-6">
              <span :class="statusClass(record.status)">
                {{ record.status }}
              </span>
            </td>
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
        const response = await axios.get('http://127.0.0.1:5000/api/viewattendance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
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
    },
    statusClass(status) {
      return {
        'text-green-600 font-semibold': status === 'Present',
        'text-red-600 font-semibold': status === 'Absent',
        'text-yellow-600 font-semibold': status === 'Late',
      };
    }
  }
};
</script>

<style scoped>
.min-w-full {
  width: 100%;
  border-collapse: collapse;
}

.min-w-full th, .min-w-full td {
  padding: 16px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.min-w-full th {
  background-color: #f3f4f6;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  font-size: 0.875rem;
}

.min-w-full tbody tr:hover {
  background-color: #f1f5f9;
}

.even\:bg-gray-50:nth-child(even) {
  background-color: #f9fafb;
}

.text-primary {
  color: #1D4ED8; /* Tailwind Indigo 600 */
}

.text-green-600 {
  color: #10B981; /* Tailwind Green 500 */
}

.text-red-600 {
  color: #EF4444; /* Tailwind Red 500 */
}

.text-yellow-600 {
  color: #F59E0B; /* Tailwind Yellow 500 */
}
</style>
