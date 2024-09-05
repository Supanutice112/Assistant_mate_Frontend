<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Course ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notification in filteredNotifications" :key="notification.id">
          <td>{{ notification.course_id }}</td>
          <td>{{ notification.date }}</td>
          <td>{{ notification.status }}</td>
          <td>
            <button @click="approveNotification(notification.id)">Approve</button>
            <button @click="rejectNotification(notification.id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    filteredNotifications() {
      return this.notifications.filter(notification => notification.status === 'Present');
    }
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/teacher_notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        this.notifications = response.data;
      } catch (error) {
        console.error("Error fetching teacher notifications:", error.response || error.message);
      }
    },
    async approveNotification(notificationId) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/approve_notification', {
          id: notificationId
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log(response.data.message);
        await this.fetchNotifications(); // Refresh notifications
      } catch (error) {
        console.error("Error approving notification:", error.response || error.message);
      }
    },
    async rejectNotification(notificationId) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/reject_notification', {
          id: notificationId
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log(response.data.message);
        await this.fetchNotifications(); // Refresh notifications
      } catch (error) {
        console.error("Error rejecting notification:", error.response || error.message);
      }
    }
  },
  created() {
    this.fetchNotifications();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
}
</style>
