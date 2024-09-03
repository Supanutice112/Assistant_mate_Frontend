<template>
  <div class="staff-homepage-container p-6">
    <!-- Welcome Section -->
    <div class="welcome-section bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg p-8 shadow-lg mb-10">
      <h1 class="text-4xl font-bold">Welcome, [Staff Name]</h1>
      <p class="text-lg mt-2">Here's a quick overview of your responsibilities and recent activities.</p>
    </div>

    <!-- Dashboard Section -->
    <div class="dashboard-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Manage Courses -->
      <router-link to="/managecourses" class="dashboard-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
        <div class="flex items-center">
          <div class="icon-container bg-blue-500 text-white p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6H20M4 10H20M4 14H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-2xl font-semibold text-gray-800">Manage Courses</h2>
            <p class="text-gray-600">Oversee and organize course details.</p>
          </div>
        </div>
      </router-link>

      <!-- Attendance Tracking -->
      <router-link to="/viewattendance" class="dashboard-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
        <div class="flex items-center">
          <div class="icon-container bg-teal-500 text-white p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-2xl font-semibold text-gray-800">Track Attendance</h2>
            <p class="text-gray-600">Monitor student attendance.</p>
          </div>
        </div>
      </router-link>

      <!-- Notifications -->
      <router-link to="/staffnotification" class="dashboard-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
        <div class="flex items-center">
          <div class="icon-container bg-red-500 text-white p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 16H11V18H13V16ZM12 4C7.02944 4 3 8.02944 3 13H5C5 9.13401 8.13401 6 12 6V4ZM12 6V8H12.01H12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-2xl font-semibold text-gray-800">Notifications</h2>
            <p class="text-gray-600">Stay updated with alerts and announcements.</p>
          </div>
        </div>
      </router-link>

      <!-- Evaluate TA -->
      <router-link to="/evaluate" class="dashboard-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
        <div class="flex items-center">
          <div class="icon-container bg-yellow-500 text-white p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-2xl font-semibold text-gray-800">Evaluate TA</h2>
            <p class="text-gray-600">Assess and review Teaching Assistants.</p>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Recent Activities Section -->
    <div class="recent-activities-section mt-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Recent Activities</h2>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <ul class="divide-y divide-gray-200">
          <li class="py-4">
            <p class="text-gray-600">You updated the course <span class="font-semibold text-gray-800">Introduction to Software Engineering</span>.</p>
            <p class="text-sm text-gray-500">2 hours ago</p>
          </li>
          <li class="py-4">
            <p class="text-gray-600">You marked attendance for <span class="font-semibold text-gray-800">Advanced Algorithms</span>.</p>
            <p class="text-sm text-gray-500">4 hours ago</p>
          </li>
          <li class="py-4">
            <p class="text-gray-600">You received a new notification regarding <span class="font-semibold text-gray-800">Course Schedule Update</span>.</p>
            <p class="text-sm text-gray-500">6 hours ago</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // You can fetch and set staff data here, like name, recent activities, etc.
    };
  }
};
</script>

<style scoped>
.staff-homepage-container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-card {
  transition: transform 0.3s ease-in-out;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.icon-container {
  min-width: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
