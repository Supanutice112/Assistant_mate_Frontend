<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
    <h1 class="text-3xl font-bold text-blue-600 mb-6 text-center">Cancel Class</h1>
    <form @submit.prevent="cancelClass" class="space-y-4">
      <div class="form-control">
        <label for="date" class="block text-lg font-semibold mb-2">Select Date</label>
        <input
          type="date"
          id="date"
          v-model="date"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div class="form-control">
        <label for="reason" class="block text-lg font-semibold mb-2">Cancellation Reason</label>
        <textarea
          id="reason"
          v-model="reason"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          rows="4"
          placeholder="Enter the reason for cancellation"
          required
        ></textarea>
      </div>
      <div class="text-center mt-6">
        <button
          type="submit"
          class="w-full bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Cancel Class
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeachercancelationView',
  data() {
    return {
      date: '', // Store the cancellation date
      reason: '', // Store the cancellation reason
    };
  },
  methods: {
    async cancelClass() {
      const courseId = this.$route.params.courseId; // Retrieve the courseId from route params
      const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage

      try {
        const response = await axios.post(
          'http://127.0.0.1:5000/api/cancel_class',
          {
            course_id: courseId,
            cancelled_date: this.date,
            cancellation_reason: this.reason,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert('Class cancelled successfully');
          this.$router.push('/teacherhome'); // Redirect back to teacher home after successful cancellation
        } else {
          alert('Failed to cancel class');
        }
      } catch (error) {
        console.error('Failed to cancel class:', error);
        alert('Failed to cancel class. Please try again later.');
      }
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here if necessary */
</style>
