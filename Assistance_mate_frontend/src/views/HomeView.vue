<template>
    <div class="homepage-container">
      <h1>Program Dashboard</h1>
      <div class="dashboard-sections">
        <div class="dashboard-section">
          <h2>วิชาที่สอน (Courses Taught)</h2>
          <ul>
            <li v-for="course in courses" :key="course.id">{{ course.name }} - {{ course.code }}</li>
          </ul>
        </div>
        <div class="dashboard-section">
          <h2>การเข้างาน (Attendance Record)</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in attendance" :key="record.date">
                <td>{{ record.date }}</td>
                <td>{{ record.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        courses: [
          { id: 1, name: 'Mathematics', code: 'MATH101' },
          { id: 2, name: 'Physics', code: 'PHYS201' },
          { id: 3, name: 'Chemistry', code: 'CHEM301' }
        ],
        attendance: [
          { date: '2023-04-01', status: 'Present' },
          { date: '2023-04-02', status: 'Absent' },
          { date: '2023-04-03', status: 'Present' }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .homepage-container {
    padding: 20px;
    max-width: 800px;
    margin: auto;
  }
  
  .dashboard-sections {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .dashboard-section {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  h1, h2 {
    color: #333;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table, th, td {
    border: 1px solid #ccc;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  </style>
  