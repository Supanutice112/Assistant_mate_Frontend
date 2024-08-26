<template>
  <div class="p-4">
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 p-2">Course ID</th>
          <th class="border border-gray-300 p-2">Date</th>
          <th class="border border-gray-300 p-2">TA Name</th>
          <th class="border border-gray-300 p-2">Start Time</th>
          <th class="border border-gray-300 p-2">End Time</th>
          <th class="border border-gray-300 p-2">Hours Worked</th>
          <th class="border border-gray-300 p-2">Wage</th>
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
          <td class="border border-gray-300 p-2">{{ record.wage }}</td>
          <td class="border border-gray-300 p-2">{{ record.calwage }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/underformview" class="button">Generate disburstment form for Undergraduate</router-link>
    <router-link to="/graformview" class="button">Generate disburstment form for Graduate</router-link>
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
        this.attendance = data.attendance.map(record => {
          // Convert minutes to hours and minutes format
          const minutesWorked = record.minutes_worked;
          const hours = Math.floor(minutesWorked / 60);
          const minutes = minutesWorked % 60;
          const hoursWorked = `${hours}h ${minutes}m`;

          // Calculate wage based on course_type
          const wageRates = {
            'stu_thai': 90,
            'stu_inter': 120,
            'grad_thai': 200,
            'grad_inter': 300,
            'lecturer': 450
          };
          const ratePerHour = wageRates[record.course_type] || 0;
          const wage = ratePerHour;
          const calwage = ratePerHour * (minutesWorked / 60);

          return {
            ...record,
            hours_worked: hoursWorked,
            calwage: calwage.toFixed(2), // Format wage to 2 decimal places
            wage: wage.toFixed(2) // Format wage to 2 decimal places
          };
        });
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      }
    }
  }
};
</script>

<style scoped>
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
}

.button:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #007bff; /* Set your button color here */
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
  background-color: #0056b3; /* Darker color for hover effect */
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
