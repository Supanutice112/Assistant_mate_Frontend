<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <div :class="['sidebar', showSide ? 'w-[250px]' : 'w-[70px]']" class="h-full bg-gray-900 text-white flex-shrink-0 transition-all duration-300">
      <div class="h-[60px] bg-gray-800 flex items-center px-4">
        <h3 v-if="showSide" class="font-bold text-lg transition-opacity duration-300">Dashboard</h3>
      </div>
      <div class="h-[calc(100vh-60px)] bg-gray-800 py-4 flex flex-col space-y-2 px-2 overflow-y-auto">
        <router-link to="/staffhome" class="sidebar-link" :class="{'justify-center': !showSide}">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M3.16405 11.3497L4 11.5587L4.45686 16.1005C4.715 18.6668 4.84407 19.9499 5.701 20.7249C6.55793 21.5 7.84753 21.5 10.4267 21.5H13.5733C16.1525 21.5 17.4421 21.5 18.299 20.7249C19.1559 19.9499 19.285 18.6668 19.5431 16.1005L20 11.5587L20.836 11.3497C21.5201 11.1787 22 10.564 22 9.85882C22 9.35735 21.7553 8.88742 21.3445 8.59985L13.1469 2.86154C12.4583 2.37949 11.5417 2.37949 10.8531 2.86154L2.65549 8.59985C2.24467 8.88742 2 9.35735 2 9.85882C2 10.564 2.47993 11.1787 3.16405 11.3497Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="14.5" r="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span v-if="showSide">Homepage</span>
        </router-link>
        <!-- <router-link to="/talist" class="sidebar-link" :class="{'justify-center': !showSide}">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" stroke-width="1.5" />
          </svg>m
          <span v-if="showSide">List of TA</span>
        </router-link> -->
        <router-link to="/evaluateresult" class="sidebar-link" :class="{'justify-center': !showSide}">
          <svg aria-hidden="true" class="mr-2 w-[24px] h-[24px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="14" height="16" fill="none" stroke="currentColor" stroke-width="2"></rect>
            <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" stroke-width="2"></line>
            <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" stroke-width="2"></line>
            <line x1="6" y1="14" x2="10" y2="14" stroke="currentColor" stroke-width="2"></line>
            <polyline points="4,8 6,10 8,6" fill="none" stroke="currentColor" stroke-width="2"></polyline>
          </svg>
          <span v-if="showSide">Evaluate Result</span>
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
            <img class="w-10 h-10 rounded-full border-2 border-gray-200" src="https://cdn-icons-png.freepik.com/256/1077/1077114.png" alt="User Avatar">
            <div class="ml-3 text-gray-700">
              <div class="text-sm font-semibold">{{ currentUser.username }}</div>
              <div class="text-xs text-blue-900 dark:text-blue-500">{{ currentUser.role }}</div>
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

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease-in-out;
}

.sidebar-link:hover {
  background-color: #4b5563;
  color: #ffffff;
}
</style>
