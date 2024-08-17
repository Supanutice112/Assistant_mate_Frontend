<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Attendance Records</h2>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 p-2">Name</th>
            <th class="border border-gray-300 p-2">Date</th>
            <th class="border border-gray-300 p-2">Course</th>
            <th class="border border-gray-300 p-2">Hours Worked</th>
            <th class="border border-gray-300 p-2">ค่าสอนชั่วโมงละ</th>
            <th class="border border-gray-300 p-2">Total</th>
            <th class="border border-gray-300 p-2">ผู้รับเงิน</th>
            <th class="border border-gray-300 p-2">หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in attendance" :key="index" class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">{{ record.ta_name }}</td>
            <td class="border border-gray-300 p-2">{{ formatDate(record.date) }}</td>
            <td class="border border-gray-300 p-2">{{ record.course_id }}</td>
            <td class="border border-gray-300 p-2">{{ calculateHoursWorked(record.start_time, record.end_time) }}</td>
            <td class="border border-gray-300 p-2"></td>
            <td class="border border-gray-300 p-2"></td>
            <td class="border border-gray-300 p-2">{{ record.ta_name }}</td>
            <td class="border border-gray-300 p-2"></td>
          </tr>
        </tbody>
      </table>
      <router-link to="/form" class="button">Back</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        attendance: [],
        loading: false,
        error: null
      };
    },
    created() {
      this.fetchAttendance();
    },
    methods: {
      async fetchAttendance() {
        this.loading = true;
        try {
          const response = await fetch('http://127.0.0.1:5000/api/attendance_summary', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch attendance records.');
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
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
      },
      calculateHoursWorked(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        const diffMs = end - start; // Difference in milliseconds
        const diffHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
        return diffHours.toFixed(1); // Return as a decimal number with one decimal place
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
    background-color: #007bff;
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
    background-color: #007bff;
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
    background-color: #0056b3;
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
  