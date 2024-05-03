<template>
    <div class="notification-container">
      <h1>Notifications</h1>
      <ul class="notification-list">
        <li v-for="(notification, index) in notifications" :key="notification.id" class="notification">
          <div class="notification-content">
            <h3>{{ notification.title }}</h3>
            <p>{{ notification.message }}</p>
          </div>
          <button @click="markAsRead(index)">Mark as Read</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    
    data() {
      return {
        notifications: [
          { id: 1, title: 'New Message', message: 'You have received a new message.', read: false },
          { id: 2, title: 'System Update', message: 'System update available. Please update your software.', read: false },
          { id: 3, title: 'Subscription Renewal', message: 'Your subscription will expire soon.', read: false }
        ]
      };
    },
    methods: {
      markAsRead(index) {
        this.notifications[index].read = true;
        // Optionally remove the notification from the list
        // this.notifications.splice(index, 1);
      }
    }
  }
  </script>
  
  <style scoped>
  .notification-container {
    padding: 20px;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
  
  .notification-list {
    list-style: none;
    padding: 0;
  }
  
  .notification {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .notification-content h3 {
    margin: 0;
    color: #333;
  }
  
  .notification-content p {
    margin: 5px 0;
    color: #666;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  