<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-photo-background">
      <!-- Welcome Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-green-700">Welcome to Assistant Mate</h1>
        <p class="text-gray-600">Please login to continue</p>
      </header>
      <!-- Teacher Login -->
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">Teacher Login</h3>
        <form @submit.prevent="loginTeacher" class="space-y-4">
          <div>
            <label for="teacher_username" class="block text-left text-sm font-medium text-gray-600 mb-1">Username</label>
            <input v-model="teacher_username" type="text" id="teacher_username" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Teacher Username" required />
          </div>
          <div>
            <label for="teacher_password" class="block text-left text-sm font-medium text-gray-600 mb-1">Password</label>
            <input v-model="teacher_password" type="password" id="teacher_password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required />
          </div>
          <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">Login</button>
        </form>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import 'animate.css';
  
  export default {
    data() {
      return {
        teacher_username: '',
        teacher_password: '',
      };
    },
    methods: {
      async loginTeacher() {
        try {
          const response = await axios.post('http://127.0.0.1:5000/login_teacher', {
            Teacher_name: this.teacher_username,
            password: this.teacher_password,
          }, {
            withCredentials: true,
          });
  
          const token = response.data.access_token;
          localStorage.setItem('access_token', token);
  
          if (response.data.message === 'Login successful') {
            this.$router.push('/teacherhome');
          } else {
            alert('Login failed. Please check your credentials.');
          }
        } catch (error) {
          if (error.response) {
            alert('An error occurred during login: ' + error.response.data.error);
          } else if (error.request) {
            console.error('No response received:', error.request);
            alert('No response received from the server.');
          } else {
            console.error('Error setting up the request:', error.message);
            alert('Error setting up the request: ' + error.message);
          }
        }
      },
    },
  };
  </script>
<style scoped>
/* Ensuring consistent layout and size with the TA login page */
.bg-white {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745; /* Tailwind Blue */
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #1e40af; /* Darker Tailwind Blue */
}

.bg-photo-background {
  background-image: url('https://img.freepik.com/free-photo/financial-background-with-spiral-notebook_1101-789.jpg?t=st=1725971026~exp=1725974626~hmac=4ad79a5be92671d2ac1fd060233b9d4c46650af77947f5b92ef7eb9c66f2b89b&w=2000');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
    