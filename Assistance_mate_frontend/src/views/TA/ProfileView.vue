<template>
  <div class="manage-account bg-gray-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
    <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Manage Account</h2>

    <!-- Change Username Section -->
    <div class="change-username mb-10">
      <h3 class="text-xl font-semibold text-gray-600 mb-4">Change Username</h3>
      <form @submit.prevent="changeUsername" class="space-y-4">
        <div>
          <label for="new-username" class="block text-sm font-medium text-gray-600 mb-2">New Username</label>
          <input
            type="text"
            v-model="newUsername"
            id="new-username"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-200">
          Change Username
        </button>
      </form>
      <p v-if="usernameMessage" class="text-green-500 mt-2">{{ usernameMessage }}</p>
    </div>

    <hr class="my-8">

    <!-- Change Password Section -->
    <div class="change-password">
      <h3 class="text-xl font-semibold text-gray-600 mb-4">Change Password</h3>
      <form @submit.prevent="changePassword" class="space-y-4">
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-600 mb-2">New Password</label>
          <input
            type="password"
            v-model="newPassword"
            id="new-password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirm-password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-200">
          Change Password
        </button>
      </form>
      <p v-if="passwordMessage" class="text-green-500 mt-2">{{ passwordMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      usernameMessage: '',
      passwordMessage: ''
    };
  },
  methods: {
    // Method to handle username change
    async changeUsername() {
      try {
        const response = await axios.post('http://localhost:5000/api/change_username', {
          new_username: this.newUsername
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`  // Include JWT token
          }
        });

        if (response.data.message) {
          this.usernameMessage = response.data.message;
        }
      } catch (error) {
        this.usernameMessage = error.response.data.message || 'Error updating username';
      }
    },

    // Method to handle password change (without requiring old password)
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordMessage = 'New password and confirmation do not match';
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/change_password', {
          new_password: this.newPassword,
          confirm_password: this.confirmPassword
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`  // Include JWT token
          }
        });

        if (response.data.message) {
          this.passwordMessage = response.data.message;
        }
      } catch (error) {
        this.passwordMessage = error.response.data.message || 'Error updating password';
      }
    }
  }
};
</script>

<style scoped>
.manage-account {
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1f2937;
  font-weight: bold;
}

form {
  margin-bottom: 1.5rem;
}

input {
  border-color: #d1d5db;
}

button {
  background-color: #3b82f6;
  color: white;
}

button:hover {
  background-color: #2563eb;
}
</style>
