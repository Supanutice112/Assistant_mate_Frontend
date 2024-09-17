<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">TA Notifications</h1>
    
    <div v-if="errorMessage" class="error text-red-600 text-center mb-4">{{ errorMessage }}</div>

    <!-- Notification List -->
    <div v-if="notifications.length" class="notification-container max-h-screen overflow-y-auto">
      <div v-for="notification in notifications" :key="notification.cancel_id" class="notification-card bg-gradient-to-r from-blue-400 to-purple-500 text-white mb-4 rounded-lg shadow-xl">
        <div class="p-4 max-h-48 overflow-y-auto">
          <h2 class="text-xl font-bold mb-2">Course ID: {{ notification.course_id }}</h2>
          <p class="text-lg mb-1"><strong>Cancelled Date:</strong> {{ formatDate(notification.cancelled_date) }}</p>
          <p class="text-lg mb-1"><strong>Cancellation Reason:</strong> {{ notification.cancellation_reason }}</p>
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
        notifications.value = response.data;
      } catch (error) {
        errorMessage.value = 'Error fetching TA notifications: ' + error.message;
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
  align-items: center; /* Center items horizontally */
}

.notification-card {
  border-radius: 10px;
  transition: transform 0.3s;
}

.notification-card:hover {
  transform: scale(1.02);
}

.notification-card-body {
  background: linear-gradient(to right, #8396ea, #a267dd);
  border-radius: 12px;
  padding: 16px;
  color: white;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 400;
}

.error {
  color: red;
  margin-bottom: 20px;
}

.max-h-screen {
  max-height: 80vh; /* Ensure the container fits the screen height */
}

.overflow-y-auto {
  overflow-y: auto; /* Enable vertical scrolling */
}

.notification-card {
  
  max-height: 200px; /* Limit the height of each card */
  width: 400px;
}

.notification-card-body {
  max-height: 100%; /* Ensure card body fits within the card height */
  overflow-y: auto; /* Scroll within the card if content is too long */
}

.text-lg {
  font-size: 1.125rem;
}

.text-xl {
  font-size: 1.25rem;
}
</style>
