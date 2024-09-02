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
      <router-link to="/underformview" class="button">Generate disbursement form Graduate</router-link>
      <br>
      <router-link to="/graformview" class="button">Generate disbursement form Undergraduate</router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      groupedSummary: {}
    };
  },
  created() {
    this.fetchAttendanceSummary();
  },
  methods: {
    async fetchAttendanceSummary() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/attendance_summary', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();

        // Group by course_id
        const grouped = data.attendance.reduce((acc, record) => {
          const courseId = record.course_id;
          
          if (!acc[courseId]) {
            acc[courseId] = [];
          }

          if (!acc[courseId].find(r => r.ta_name === record.ta_name)) {
            acc[courseId].push({
              ta_name: record.ta_name,
              total_hours_worked: 0,
              attendance_count: 0
            });
          }

          const taSummary = acc[courseId].find(r => r.ta_name === record.ta_name);

          const minutesWorked = record.minutes_worked;
          const hoursWorked = minutesWorked / 60;

          taSummary.total_hours_worked += hoursWorked;
          taSummary.attendance_count += 1;

          return acc;
        }, {});

        // Format data
        this.groupedSummary = Object.entries(grouped).reduce((acc, [courseId, records]) => {
          acc[courseId] = records.map(record => ({
            ...record,
            total_hours_worked: record.total_hours_worked.toFixed(2),
            attendance_count: record.attendance_count
          }));
          return acc;
        }, {});

      } catch (error) {
        console.error('Failed to fetch attendance summary:', error);
      }
    }
  }
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.footer {
  padding: 1rem;
  text-align: center;
  background-color: #ffffff; /* Optional: Add background color if desired */
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
  background-color: #27bb79; /* Set your button color here */
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
  background-color: #35a704; /* Darker color for hover effect */
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

/* Optional reset for presentation */
* {
  font-family: Arial, sans-serif;
  text-decoration: none;
  font-size: 20px;
}

.container {
  padding-top: 50px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

h1 {
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 2rem;
  color: #777;
}

span {
  display: block;
  margin-top: 2rem;
  font-size: 0.7rem;
  color: #777;
}

span a {
  font-size: 0.7rem;
  color: #999;
  text-decoration: underline;
}
</style>
