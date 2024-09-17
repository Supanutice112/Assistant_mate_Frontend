<template>
  <div class="notifications-container">
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
          class="card bg-base-100 w-full shadow-xl"
        >
          <div class="card-body">
            <h2 class="card-title">Course: {{ notification.course_name }}</h2>
            <p>Course ID: {{ notification.course_id }}</p>
            <p>TA Name: {{ notification.ta_name }}</p>
            <p>Date: {{ formatDate(notification.date) }}</p>
            <p>Status: {{ notification.status }}</p>
            <div class="card-actions justify-end">
              <button class="btn bg-green-500 text-white hover:bg-green-600" @click="approveNotification(notification.id)">Approve</button>
              <button class="btn bg-red-500 text-white hover:bg-red-600" @click="rejectNotification(notification.id)">Reject</button>

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
          { id: notificationId },
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
          { id: notificationId },
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
.notifications-container {
  max-height: calc(95vh - 4rem); /* Adjust height to fit within the viewport */
  overflow-y: auto; /* Enable scrolling if content exceeds the container's height */
  padding: 1rem;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically if content height is less than container height */
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 500px;
}

.card {
  margin-bottom: 16px;
}

.alert-success, .alert-error {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.5s ease-in-out; /* Smooth fade out effect */
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.loading {
  font-size: 1.5rem;
  color: #888;
  text-align: center;
}

.btn-approve {
  background-color: #28a745; /* Green */
  color: white;
}

.btn-approve:hover {
  background-color: #218838; /* Darker green */
}

.btn-reject {
  background-color: #dc3545; /* Red */
  color: white;
}

.btn-reject:hover {
  background-color: #c82333; /* Darker red */
}

</style>
