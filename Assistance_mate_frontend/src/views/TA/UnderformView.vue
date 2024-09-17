<template>
  <div class="p-4 max-w-6xl mx-auto shadow-lg rounded-lg bg-white">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Disbursement form for UnderGraduate</h2>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="loading" class="text-center">Loading attendance records...</div>
    <table v-else class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-blue-600 text-white">
          <th class="border border-gray-300 p-4">Date</th>
          <th class="border border-gray-300 p-4">Start Time</th>
          <th class="border border-gray-300 p-4">TA Name</th>
          <th class="border border-gray-300 p-4">End Time</th>
          <th class="border border-gray-300 p-4">Hours Worked</th>
          <th class="border border-gray-300 p-4">Course</th>
          <th class="border border-gray-300 p-4">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in transformedAttendance" :key="index" class="hover:bg-gray-100 transition-colors">
          <td class="border border-gray-300 p-3 text-center">{{ formatDate(record.date) }}</td>
          <td class="border border-gray-300 p-3 text-center">{{ record.start_time }}</td>
          <td class="border border-gray-300 p-3 text-center">{{ record.ta_name }}</td>
          <td class="border border-gray-300 p-3 text-center">{{ record.end_time }}</td>
          <td class="border border-gray-300 p-3 text-center">{{ record.hours_worked }}</td>
          <td class="border border-gray-300 p-3 text-center">{{ record.course_id }}</td>
          <td class="border border-gray-300 p-3 text-center">{{ record.work_done }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-6 font-bold text-gray-700 text-right text-xl">Total Hours Worked: {{ totalHoursWorked }} hours</div>

    <div class="mt-6 flex justify-between">
      <!-- Back button -->
      <router-link to="/form" class="button bg-gray-600 hover:bg-gray-800">Back</router-link>

      <!-- Print button -->
      <button @click="printForm" class="button bg-blue-600 hover:bg-blue-800">Print</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attendance: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    transformedAttendance() {
      let transformed = [];

      const timeSlots = [
        { start: "08:00", end: "10:00", hours: 2 },
        { start: "10:00", end: "12:00", hours: 2 },
        { start: "13:00", end: "18:00", hours: 5 },
      ];

      let groupedByDate = this.attendance.reduce((acc, record) => {
        if (!acc[record.date]) acc[record.date] = [];
        acc[record.date].push(record);
        return acc;
      }, {});

      for (const records of Object.values(groupedByDate)) {
        for (const slot of timeSlots) {
          const record = records[0]; 
          transformed.push({
            date: record.date,
            start_time: slot.start,
            end_time: slot.end,
            ta_name: record.ta_name,
            hours_worked: `${slot.hours}h 0m`,
            course_id: record.course_id,
            work_done: record.work_done,
          });
        }
      }

      return transformed;
    },
    totalHoursWorked() {
      return this.transformedAttendance.reduce((total, record) => {
        const hours = parseInt(record.hours_worked.split('h')[0], 10);
        return total + hours;
      }, 0);
    }
  },
  created() {
    this.fetchAttendance();
  },
  methods: {
    async fetchAttendance() {
      this.loading = true;
      try {
        const response = await fetch("http://127.0.0.1:5000/api/attendance_summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch attendance records.");
        }
        const data = await response.json();
        this.attendance = data.attendance;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return new Date(dateString).toLocaleDateString("en-GB", options);
    },
    printForm() {
      window.print();
    }
  },
};
</script>

<style scoped>
.p-4 {
  padding: 1rem;
}

.max-w-6xl {
  max-width: 72rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.75rem;
}

.bg-white {
  background-color: #fff;
}

.text-gray-800 {
  color: #2d3748;
}

.text-gray-700 {
  color: #4a5568;
}

.bg-gray-600 {
  background-color: #4a5568;
}

.bg-gray-800 {
  background-color: #2d3748;
}

.bg-blue-600 {
  background-color: #3182ce;
}

.bg-blue-800 {
  background-color: #2b6cb0;
}

.text-white {
  color: #fff;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.table-auto {
  table-layout: auto;
}

.border-collapse {
  border-collapse: collapse;
}

.border {
  border-width: 1px;
}

.border-gray-300 {
  border-color: #d2d6dc;
}

.p-4 {
  padding: 1rem;
}

.p-3 {
  padding: 0.75rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.transition-colors {
  transition: background-color 0.2s;
}

.button {
  padding: 0.75rem 1.5rem;
  color: white;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  transition: background-color 0.3s ease;
}

.button:hover {
  cursor: pointer;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.ml-4 {
  margin-left: 1rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.text-center {
  text-align: center;
}
</style>
