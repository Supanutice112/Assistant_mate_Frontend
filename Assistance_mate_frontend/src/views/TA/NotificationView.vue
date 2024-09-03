<template>
  <div>
    <h1>TA Notifications</h1>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <table v-if="notifications.length" class="notification-table">
      <thead>
        <tr>
          <th>Cancel ID</th>
          <th>Course ID</th>
          <th>Cancelled Date</th>
          <th>Cancellation Reason</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notification in notifications" :key="notification.cancel_id">
          <td>{{ notification.cancel_id }}</td>
          <td>{{ notification.course_id }}</td>
          <td>{{ formatDate(notification.cancelled_date) }}</td>
          <td>{{ notification.cancellation_reason }}</td>
          <td>{{ formatDate(notification.created_at) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>No notifications available.</div>
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
.notification-table {
  width: 100%;
  border-collapse: collapse;
}

.notification-table th, .notification-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.notification-table th {
  background-color: #f4f4f4;
}

.error {
  color: red;
}
</style>
