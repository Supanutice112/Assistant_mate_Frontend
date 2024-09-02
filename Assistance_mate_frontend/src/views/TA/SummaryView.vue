<template>
  <div class="p-4">
    <div v-for="(courseSummary, courseId) in groupedSummary" :key="courseId">
      <h2 class="text-lg font-bold mb-2 text-left">Course: {{ courseId }}</h2>
      <table class="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 p-2">TA Name</th>
            <th class="border border-gray-300 p-2">Total Hours Worked</th>
            <th class="border border-gray-300 p-2">Total Attendance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in courseSummary" :key="index" class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">{{ record.ta_name }}</td>
            <td class="border border-gray-300 p-2">{{ record.total_hours_worked }}</td>
            <td class="border border-gray-300 p-2">{{ record.attendance_count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 footer">
      <router-link
        v-if="ta_status === 'graduated'"
        to="/graformview"
        class="button"
      >
        Generate disbursement form for Graduated
      </router-link>
      <router-link
        v-else
        to="/underformview"
        class="button"
      >
        Generate disbursement form for Undergraduate
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupedSummary: {},
      ta_status: '',  // TA status will be set here
    };
  },
  created() {
    this.fetchTaStatus();  // Fetch TA status when component is created
    this.fetchAttendanceSummary();
  },
  methods: {
    async fetchTaStatus() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get_ta_status', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        if (data.ta_status) {
          this.ta_status = data.ta_status;
          // Optionally store ta_status in localStorage or Vuex if needed elsewhere
        } else {
          console.error('Failed to retrieve TA status:', data.message);
        }
      } catch (error) {
        console.error('Error fetching TA status:', error);
      }
    },
    async fetchAttendanceSummary() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/attendance_summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();

        // Group by course_id
        const grouped = data.attendance.reduce((acc, record) => {
          const courseId = record.course_id;

          if (!acc[courseId]) {
            acc[courseId] = [];
          }

          let taSummary = acc[courseId].find(r => r.ta_name === record.ta_name);
          if (!taSummary) {
            taSummary = {
              ta_name: record.ta_name,
              total_hours_worked: 0,
              attendance_count: 0
            };
            acc[courseId].push(taSummary);
          }

          const hoursWorked = record.minutes_worked / 60;
          taSummary.total_hours_worked += hoursWorked;
          taSummary.attendance_count += 1;

          return acc;
        }, {});

        // Format data
        this.groupedSummary = Object.fromEntries(
          Object.entries(grouped).map(([courseId, records]) => [
            courseId,
            records.map(record => ({
              ...record,
              total_hours_worked: record.total_hours_worked.toFixed(2)
            }))
          ])
        );
      } catch (error) {
        console.error('Failed to fetch attendance summary:', error);
      }
    }
  }
};
</script>

<style scoped>
.footer {
  padding: 1rem;
  text-align: center;
  background-color: #ffffff;
}

.button {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin: 0.5rem;
}

.button:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #27bb79;
  border-radius: 10rem;
  z-index: -2;
}

.button:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #35a704;
  transition: all 0.3s;
  border-radius: 10rem;
  z-index: -1;
}

.button:hover {
  color: #fff;
}

.button:hover:before {
  width: 100%;
}
</style>
