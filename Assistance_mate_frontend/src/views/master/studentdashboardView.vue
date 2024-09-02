<template>
    <div class="w-screen h-screen flex">
        <!-- Sidebar -->
        <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
            <div class="h-[50px] bg-gray-900 flex justify-start items-center">
                <div class="px-[20px] flex">
                    <h3 class="font-bold text-xl">Dashboard</h3>
                </div>
            </div>
            <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px] flex">
                <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
                    <router-link to="/StudentEvaluate" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                            <path d="M16.6127 16.0846C13.9796 17.5677 12.4773 20.6409 12 21.5V8C12.4145 7.25396 13.602 5.11646 15.6317 3.66368C16.4868 3.05167 16.9143 2.74566 17.4572 3.02468C18 3.30371 18 3.91963 18 5.15146V13.9914C18 14.6568 18 14.9895 17.8634 15.2233C17.7267 15.4571 17.3554 15.6663 16.6127 16.0846L16.6127 16.0846Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 7.80556C11.3131 7.08403 9.32175 5.3704 5.98056 4.76958C4.2879 4.4652 3.44157 4.31301 2.72078 4.89633C2 5.47965 2 6.42688 2 8.32133V15.1297C2 16.8619 2 17.728 2.4626 18.2687C2.9252 18.8095 3.94365 18.9926 5.98056 19.3589C7.79633 19.6854 9.21344 20.2057 10.2392 20.7285C11.2484 21.2428 11.753 21.5 12 21.5C12.247 21.5 12.7516 21.2428 13.7608 20.7285C14.7866 20.2057 16.2037 19.6854 18.0194 19.3589C20.0564 18.9926 21.0748 18.8095 21.5374 18.2687C22 17.728 22 16.8619 22 15.1297V8.32133C22 6.42688 22 5.47965 21.2792 4.89633C20.5584 4.31301 19 4.76958 18 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Ta Evaluate
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="w-full h-full bg-gray-400">
            <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b ">
                <!-- Hamberger menu -->
                <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class=" w-[25px] h-[25px] ">
                      <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                  </div>
                  <!-- Search bar -->
                  <div class="w-[calc(100%-30px)] flex">
                    <div class="w-[calc(100%-200px)] flex justify-center ">
                        <!-- Search bar -->
                        <form class="flex items-center w-[500px] ">
                            <label for="voice-search" class="sr-only">Search</label>
                            <div class="relative w-full justify-center">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                </div>
                            </div>
                        </form>
                    </div>
                     <!-- User login -->
                     <div class="w-[200px] ">
                        <div class="flex items-center justify-start space-x-4" @click="toggleDrop">
                            <img class="w-10 h-10 rounded-full border-2 border-black" src="https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid" alt="">
                            <div class="font-semibold dark:text-black text-left">
                                <div>{{ currentUser.username }}</div>
                                <div class="text-xs text-blue-900 dark:text-blue-500">Student</div>
                            </div>
                        </div>
                         <!-- Drop down -->
                         <div v-show="showDropDown" class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1 text-left" role="none">
                                <router-link to="/" action="#" role="none">
                                    <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                                </router-link>
                            </div>
                         </div>
                     </div>
                  </div>
            </div>
            <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
                <div class="border border-gray-300 rounded-md p-[20px] h-full">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <!-- Main content -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showDropDown: false,
      showSide: true, // Initialize showSide to true
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
    // hide/show sidebar
    toggleSideBar() {
      this.showSide = !this.showSide;
    },
    // toggle user dropdown
    toggleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    // fetch current user data from backend
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
/* Add any specific styles here if necessary */
</style>
