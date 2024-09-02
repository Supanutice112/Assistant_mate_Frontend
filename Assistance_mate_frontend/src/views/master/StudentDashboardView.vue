<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <div class="w-[250px] h-full bg-gray-900 text-white flex-shrink-0">
      <div class="h-[60px] bg-gray-800 flex items-center px-4">
        <h3 class="font-bold text-lg">Dashboard</h3>
      </div>
      <div class="h-[calc(100vh-60px)] bg-gray-800 py-4 flex flex-col space-y-2 px-2 overflow-y-auto">
        <router-link to="/studenthome" class="inline-flex items-center py-3 px-4 text-sm font-medium rounded-md hover:bg-gray-700 transition duration-200 ease-in-out" active-class="bg-blue-600">
          <svg class="mr-3 w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a2 2 0 114 0 2 2 0 01-4 0zM4.05 9.05A7.978 7.978 0 0110 4a7.978 7.978 0 015.95 2.05c-.2.54-.76.95-1.4.95H5.45c-.64 0-1.2-.41-1.4-.95z" clip-rule="evenodd"></path>
          </svg>
          Home
        </router-link>
        <router-link to="/studentprofile" class="inline-flex items-center py-3 px-4 text-sm font-medium rounded-md hover:bg-gray-700 transition duration-200 ease-in-out" active-class="bg-blue-600">
          <svg class="mr-3 w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a2 2 0 114 0 2 2 0 01-4 0zM4.05 9.05A7.978 7.978 0 0110 4a7.978 7.978 0 015.95 2.05c-.2.54-.76.95-1.4.95H5.45c-.64 0-1.2-.41-1.4-.95z" clip-rule="evenodd"></path>
          </svg>
          Profile
        </router-link>
        <router-link to="/studentevaluate" class="inline-flex items-center py-3 px-4 text-sm font-medium rounded-md hover:bg-gray-700 transition duration-200 ease-in-out" active-class="bg-blue-600">
          <svg class="mr-3 w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a2 2 0 114 0 2 2 0 01-4 0zM4.05 9.05A7.978 7.978 0 0110 4a7.978 7.978 0 015.95 2.05c-.2.54-.76.95-1.4.95H5.45c-.64 0-1.2-.41-1.4-.95z" clip-rule="evenodd"></path>
          </svg>
          Evaluate Teacher Assistant
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 h-full bg-gray-100 flex flex-col">
      <div class="h-[60px] bg-white flex items-center shadow px-4 border-b">
        <!-- Hamburger Menu -->
        <div class="cursor-pointer mr-4" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-6 h-6 text-gray-700">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>

        <!-- User Profile -->
        <div class="ml-auto relative">
          <div class="flex items-center cursor-pointer" @click="toggleDrop">
            <img class="w-10 h-10 rounded-full border-2 border-gray-200" src="https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid" alt="User Avatar">
            <div class="ml-3 text-gray-700">
              <div class="text-sm font-semibold">{{ currentUser.username }}</div>
              <div class="text-xs text-blue-900 dark:text-blue-500">Student</div>
            </div>
          </div>

          <!-- Dropdown Menu -->
          <div v-show="showDropDown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <router-link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</router-link>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 p-4 overflow-auto">
        <div class="bg-white border border-gray-200 rounded-lg shadow p-4">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showDropDown: false,
      showSide: true, // Sidebar is shown by default
      currentUser: {
        username: '',
        role: ''
      }
    }
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    // Toggle sidebar visibility
    toggleSideBar() {
      this.showSide = !this.showSide;
    },
    // Toggle user dropdown menu
    toggleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    // Fetch current user data from backend
    async fetchCurrentUser() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/current_user', {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        this.currentUser = response.data;
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    }
  }
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #2563eb;
  color: white;
}
</style>
