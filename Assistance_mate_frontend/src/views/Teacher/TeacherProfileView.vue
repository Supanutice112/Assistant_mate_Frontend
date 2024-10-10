<template>
    <div class="teacher-profile bg-gray-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Teacher Profile</h2>
      
      <hr class="my-8">
  
      <!-- Display Teacher Profile Information -->
      <div class="profile-info mb-10">
        <h3 class="text-xl font-semibold text-gray-600 mb-4">Profile Information</h3>
        <p><strong>Name:</strong> {{ teacherInfo.Teacher_name }}</p>
        <p><strong>Email:</strong> {{ teacherInfo.Email }}</p>
      </div>
  
      <hr class="my-8">
  
      <!-- Change Username Section -->
      <div class="change-username mb-10">
        <h3 class="text-xl font-semibold text-gray-600 mb-4">Change Username</h3>
        <form @submit.prevent="changeUsername" class="space-y-4">
          <div>
            <label for="new-username" class="block text-sm font-medium text-gray-600 mb-2">New Username</label>
            <input
              type="text"
              v-model="newUsername"
              id="new-username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-200">
            Change Username
          </button>
        </form>
        <p v-if="usernameMessage" class="text-green-500 mt-2">{{ usernameMessage }}</p>
        <p v-if="usernameError" class="text-red-500 mt-2">{{ usernameError }}</p>
      </div>
  
      <hr class="my-8">
  
      <!-- Change Password Section -->
      <div class="change-password">
        <h3 class="text-xl font-semibold text-gray-600 mb-4">Change Password</h3>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label for="current-password" class="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
            <input
              type="password"
              v-model="currentPassword"
              id="current-password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="new-password" class="block text-sm font-medium text-gray-600 mb-2">New Password</label>
            <input
              type="password"
              v-model="newPassword"
              id="new-password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
            <input
              type="password"
              v-model="confirmPassword"
              id="confirm-password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-200">
            Change Password
          </button>
        </form>
        <p v-if="passwordMessage" class="text-green-500 mt-2">{{ passwordMessage }}</p>
        <p v-if="passwordError" class="text-red-500 mt-2">{{ passwordError }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        teacherInfo: {},         // Store teacher's profile information
        newUsername: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        usernameMessage: null,
        usernameError: null,
        passwordMessage: null,
        passwordError: null,
      };
    },
    methods: {
      async fetchTeacherProfile() {
        try {
          const response = await axios.get('http://localhost:5000/api/teacher/profile', {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`, // Adjust based on your token storage
            },
          });
          this.teacherInfo = response.data;
        } catch (error) {
          console.error("Error fetching teacher profile:", error);
        }
      },
      
      async teacherchange_username() {
        try {
          const response = await axios.post('http://localhost:5000/api/teacherchange_username', {
            new_username: this.newUsername,
          }, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`, // Adjust based on your token storage
            },
          });
          this.usernameMessage = response.data.message;
          this.usernameError = null;
          this.fetchTeacherProfile(); // Refresh profile info after change
        } catch (error) {
          this.usernameError = error.response?.data?.message || 'An error occurred';
          this.usernameMessage = null;
        }
      },
  
      async changePassword() {
        // Implement change password logic similar to changeUsername
        // Use axios to send the new password to the backend
      },
    },
    mounted() {
      this.fetchTeacherProfile(); // Call the method to fetch profile info when the component is mounted
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  