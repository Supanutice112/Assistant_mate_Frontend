<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Cancel Class</h1>
      <form @submit.prevent="cancelClass" class="space-y-4">
        <div class="form-control">
          <label for="date" class="label">Date</label>
          <input type="date" id="date" v-model="date" class="input" required />
        </div>
        <div class="form-control">
          <label for="reason" class="label">Cancellation Reason</label>
          <textarea id="reason" v-model="reason" class="input" rows="3" placeholder="Enter reason for cancellation" required></textarea>
        </div>
        <!-- You can optionally show course details here -->
        <!-- For example: -->
        <!-- <div>
          <p>Course ID: {{ $route.params.courseId }}</p>
        </div> -->
        <button type="submit" class="btn bg-red-400">Cancel Class</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TeachercancelationView',
    data() {
      return {
        date: '',       // Store the cancellation date
        reason: '',     // Store the cancellation reason
      };
    },
    methods: {
      async cancelClass() {
        const courseId = this.$route.params.courseId;  // Retrieve the courseId from route params
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
                Authorization: `Bearer ${token}`
              }
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
  