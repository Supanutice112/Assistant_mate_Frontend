<template>
  <div>
    <div v-if="message" class="alert alert-success">{{ message }}</div>
    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div v-if="loading" class="loading text-center">
      <p>Loading notifications...</p>
    </div>

    <div v-else class="card-container">
      <div v-if="filteredNotifications.length">
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          class="card bg-base-100 w-96 shadow-xl"
        >
          <div class="card-body">
            <h2 class="card-title">Course ID: {{ notification.course_id }}</h2>
            <p>Date: {{ formatDate(notification.date) }}</p>
            <p>Status: {{ notification.status }}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="approveNotification(notification.id)">Approve</button>
              <button class="btn btn-secondary" @click="rejectNotification(notification.id)">Reject</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center">
        <p>No notifications available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      notifications: [],
      loading: true,
      message: '',
      error: ''
    };
  },
  computed: {
    filteredNotifications() {
      return this.notifications.filter((notification) => notification.status === 'Present');
    }
  },
  methods: {
    async fetchNotifications() {
      this.loading = true;
      this.error = '';
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/teacher_notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        // Assuming the notifications are returned under `response.data.notifications`
        this.notifications = response.data.notifications || [];
      } catch (error) {
        this.error = 'Failed to load notifications.';
        console.error('Error fetching teacher notifications:', error.response || error.message);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async approveNotification(notificationId) {
      try {
        await axios.post(
          'http://127.0.0.1:5000/api/approve_notification',
          {
            id: notificationId
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }
        );
        this.message = 'Notification approved successfully.';
        this.error = ''; // Clear any existing error message
        await this.fetchNotifications(); // Refresh notifications
      } catch (error) {
        this.error = 'Error approving notification.';
        this.message = ''; // Clear any existing success message
        console.error('Error approving notification:', error.response || error.message);
      }
    },
    async rejectNotification(notificationId) {
      try {
        await axios.post(
          'http://127.0.0.1:5000/api/reject_notification',
          {
            id: notificationId
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }
        );
        this.message = 'Notification rejected successfully.';
        this.error = ''; // Clear any existing error message
        await this.fetchNotifications(); // Refresh notifications
      } catch (error) {
        this.error = 'Error rejecting notification.';
        this.message = ''; // Clear any existing success message
        console.error('Error rejecting notification:', error.response || error.message);
      }
    }
  },
  created() {
    this.fetchNotifications();
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  margin-bottom: 16px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.loading {
  font-size: 1.5rem;
  color: #888;
  text-align: center;
}
</style>
