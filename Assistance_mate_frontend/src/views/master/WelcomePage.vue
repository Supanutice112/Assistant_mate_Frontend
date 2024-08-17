<template>
    <div class="welcome-page min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <!-- Logo Section -->
      <div class="logo mb-8">
        <img src="@/assets/logo.png" alt="Application Logo" class="w-32 h-32" />
      </div>
  
      <!-- Buttons Section -->
      <div class="login-buttons space-y-4">
        <button class="btn btn-primary w-64" @click="login('teacher')">Login as Teacher</button>
        <button class="btn btn-secondary w-64" @click="login('ta')">Login as TA</button>
        <button class="btn btn-accent w-64" @click="login('student')">Login as Student</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      login(userType) {
        this.$router.push({ name: `${userType}Login` });
      },
    },
  };
  </script>
  
  <style scoped>
  .welcome-page {
    background: url('@/assets/background.jpg') no-repeat center center;
    background-size: cover;
  }
  
  .logo img {
    object-fit: contain;
  }
  </style>
  