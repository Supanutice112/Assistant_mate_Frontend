<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <!-- Welcome Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-green-700">Welcome to Assistant Mate</h1>
        <p class="text-gray-600">Please login to continue</p>
      </header>
      <!-- TA Login -->
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6 text-center " >
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">Staff Login</h3>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="username" class="block text-left text-sm font-medium text-gray-600 mb-1">Username</label>
            <input v-model="username" type="text" id="username" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" required />
          </div>
          <div>
            <label for="password" class="block text-left text-sm font-medium text-gray-600 mb-1">Password</label>
            <input v-model="password" type="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required />
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
        username: '',
        password: '',
        teacher_username: '', // Add teacher_username
        teacher_password: '', // Add teacher_password
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://127.0.0.1:5000/login', {
            username: this.username,
            password: this.password,
          }, {
            withCredentials: true,
          });
          const token = response.data.access_token;
          localStorage.setItem('access_token', token);
  
          if (response.data.message === 'Login successful') {
            this.$router.push('/staffhome');
          } else {
            alert('Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('An invalid username or password');
        }
      }
    }
}
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  .error {
    margin-top: 15px;
    color: red;
  }
  </style>