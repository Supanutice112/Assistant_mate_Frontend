<template>
    <div class="instructor-notifications">
      <h1>Instructor Notifications</h1>
      <ul>
        <li v-for="(item, index) in notifications" :key="index" class="notification-item">
          <div>
            <p><strong>Date:</strong> {{ item.date }}</p>
            <p><strong>TA:</strong> {{ item.taName }}</p>
            <p><strong>Start Time:</strong> {{ item.startTime }}</p>
            <p><strong>End Time:</strong> {{ item.endTime }}</p>
          </div>
          <div class="actions">
            <button @click="updateStatus(item, 'approved')">Approve</button>
            <button @click="updateStatus(item, 'rejected')">Reject</button>
          </div>
        </li>
      </ul>
      <p v-if="notifications.length === 0">No pending notifications.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'InstructorNotificationView',
    data() {
      return {
        notifications: []
      };
    },
    methods: {
      fetchNotifications() {
        axios.get('/api/instructor/notifications')
          .then(response => {
            this.notifications = response.data;
          })
          .catch(error => {
            console.error('Error fetching notifications:', error);
          });
      },
      updateStatus(item, status) {
        axios.put(`/api/instructor/notifications/${item.id}`, { status })
          .then(() => {
            item.status = status; // Update the local state to reflect the change
            this.fetchNotifications(); // Optionally re-fetch or you can filter out the item locally
          })
          .catch(error => {
            console.error('Error updating status:', error);
          });
      }
    },
    created() {
      this.fetchNotifications();
    }
  };
  </script>
  
  <style scoped>
  .instructor-notifications {
    padding: 20px;
  }
  .notification-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  .actions button {
    margin-right: 10px;
  }
  </style>
  