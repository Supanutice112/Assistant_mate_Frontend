<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">TA Notifications</h1>
    
    <div v-if="errorMessage" class="error text-red-600 text-center mb-4">{{ errorMessage }}</div>
    
    <div v-if="notifications.length" class="notification-container">
      <div v-for="notification in notifications" :key="notification.cancel_id" class="card bg-gradient-to-r from-blue-400 to-purple-500 text-white w-full max-w-lg mx-auto shadow-xl mb-6">
        <div class="card-body p-6">
          <h2 class="card-title text-2xl font-bold mb-4">Course ID: {{ notification.course_id }}</h2>
          <p class="text-lg"><strong>Cancelled Date:</strong> {{ formatDate(notification.cancelled_date) }}</p>
          <p class="text-lg"><strong>Cancellation Reason:</strong> {{ notification.cancellation_reason }}</p>
          <p class="text-lg"><strong>Created At:</strong> {{ formatDate(notification.created_at) }}</p>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center text-gray-500">No notifications available.</div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'NotificationView',
  setup() {
    const notifications = ref([]);
    const errorMessage = ref('');

    // Fetch TA notifications from the API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/ta_notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        // Assuming the API returns a 'cancellations' key
        notifications.value = response.data.cancellations || [];
      } catch (error) {
        // Capture detailed error response if available
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage.value = `Error fetching TA notifications: ${error.response.data.message}`;
        } else {
          errorMessage.value = `Error fetching TA notifications: ${error.message}`;
        }
      }
    };

    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    // Call fetchNotifications when component is mounted
    onMounted(fetchNotifications);

    return {
      notifications,
      errorMessage,
      formatDate
    };
  }
};
</script>

<style scoped>
.notification-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  border-radius: 12px;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card-body {
  background: linear-gradient(to right, #667eea, #764ba2);
  border-radius: 12px;
  padding: 16px;
  color: white;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 600;
}

.error {
  color: red;
  margin-bottom: 20px;
}
</style>
