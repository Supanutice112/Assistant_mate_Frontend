<template>
  <div class="homepage-container p-6">
    <!-- Welcome Section -->
    <div class="welcome-section bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-8 shadow-lg mb-10 text-center">
      <h1 class="text-4xl font-extrabold">Welcome to Assistant Mate</h1>
      <p class="text-lg mt-4">Your one-stop solution for managing your courses, attendance, and more.</p>
    </div>

    <!-- Quick Access Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Course Management -->
      <router-link to="/teachercourse" class="quick-access-card bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg p-6">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M16.6127 16.0846C13.9796 17.5677 12.4773 20.6409 12 21.5V8C12.4145 7.25396 13.602 5.11646 15.6317 3.66368C16.4868 3.05167 16.9143 2.74566 17.4572 3.02468C18 3.30371 18 3.91963 18 5.15146V13.9914C18 14.6568 18 14.9895 17.8634 15.2233C17.7267 15.4571 17.3554 15.6663 16.6127 16.0846L16.6127 16.0846Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 7.80556C11.3131 7.08403 9.32175 5.3704 5.98056 4.76958C4.2879 4.4652 3.44157 4.31301 2.72078 4.89633C2 5.47965 2 6.42688 2 8.32133V15.1297C2 16.8619 2 17.728 2.4626 18.2687C2.9252 18.8095 3.94365 18.9926 5.98056 19.3589C7.79633 19.6854 9.21344 20.2057 10.2392 20.7285C11.2484 21.2428 11.753 21.5 12 21.5C12.247 21.5 12.7516 21.2428 13.7608 20.7285C14.7866 20.2057 16.2037 19.6854 18.0194 19.3589C20.0564 18.9926 21.0748 18.8095 21.5374 18.2687C22 17.728 22 16.8619 22 15.1297V8.32133C22 6.42688 22 5.47965 21.2792 4.89633C20.5584 4.31301 19 4.76958 18 5.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h2 class="text-xl font-semibold">Manage Courses</h2>
          <p class="mt-2">View and manage your courses easily.</p>
        </div>
      </router-link>
      

      <!-- Notification -->
      <router-link to="/teachernotification" class="quick-access-card bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg p-6">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24"  color="#ffffff" >
            <path d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
          <h2 class="text-xl font-semibold">Notification</h2>
          <p class="mt-2">Stay updated with the latest notifications</p>
        </div>
      </router-link>

<!-- Evaluate -->
<router-link to="/teacherevaluate" class="quick-access-card bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-lg p-6">
  <div class="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M14.9805 7.01556C14.9805 7.01556 15.4805 7.51556 15.9805 8.51556C15.9805 8.51556 17.5687 6.01556 18.9805 5.51556" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9.99491 2.02134C7.49644 1.91556 5.56618 2.20338 5.56618 2.20338C4.34733 2.29053 2.01152 2.97385 2.01154 6.96454C2.01156 10.9213 1.9857 15.7993 2.01154 17.7439C2.01154 18.932 2.74716 21.7033 5.29332 21.8518C8.38816 22.0324 13.9628 22.0708 16.5205 21.8518C17.2052 21.8132 19.4847 21.2757 19.7732 18.7956C20.0721 16.2263 20.0126 14.4407 20.0126 14.0157" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21.9999 7.01556C21.9999 9.77698 19.7592 12.0156 16.9951 12.0156C14.231 12.0156 11.9903 9.77698 11.9903 7.01556C11.9903 4.25414 14.231 2.01556 16.9951 2.01556C19.7592 2.01556 21.9999 4.25414 21.9999 7.01556Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M6.98053 13.0156H10.9805" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M6.98053 17.0156H14.9805" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <h2 class="text-xl font-semibold">Evaluate TA</h2>
      <p class="mt-2">Evaluate Teaching Assistant performance.</p>
  </div>
</router-link>

    </div>

<!-- Additional Information Section -->
<div class="bg-white rounded-lg p-10 shadow-lg mt-12 text-center transform transition duration-300 hover:shadow-xl hover:scale-105">
  <h2 class="text-3xl font-extrabold text-gray-800 mb-6">Get Started with Assistant Mate</h2>
  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Explore the features and tools designed to simplify your work as an educator. Whether you're managing courses, tracking attendance, or evaluating TAs, Assistant Mate has got you covered. Click on the cards above to navigate to your desired section.
  </p>
  <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
    <p class="text-lg text-gray-700">
      Have any issues? Contact <span class="font-semibold text-gray-900">P.Big :</span> 
    </p>
    <router-link to="" class="text-lg font-semibold text-blue-600 underline hover:text-blue-800 transition duration-300 ease-in-out">
      091-0681-232
    </router-link>
    <p class="text-lg text-gray-700">for tutorials and support.</p>
  </div>
</div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.homepage-container {
  max-width: 1200px;
  margin: 0 auto;
}

.quick-access-card {
  transition: transform 0.3s ease-in-out;
}

.quick-access-card:hover {
  transform: translateY(-5px);
}
</style>
