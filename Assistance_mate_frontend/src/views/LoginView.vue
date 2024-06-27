<template>
  <div>
    <!-- Student Login -->
    <div class="login-container">
      <h3>Student Login</h3>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" placeholder="Username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

    <!-- Teacher Login -->
    <div class="login-container">
      <h3>Teacher Login</h3>
      <form @submit.prevent="loginTeacher">
        <div class="form-group">
          <label for="teacher_username">Username</label>
          <input v-model="teacher_username" type="text" id="teacher_username" placeholder="Teacher Username" required />
        </div>
        <div class="form-group">
          <label for="teacher_password">Password</label>
          <input v-model="teacher_password" type="password" id="teacher_password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      teacher_username: '', // Add teacher_username
      teacher_password: '', // Add teacher_password
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/login', {
          username: this.username,
          password: this.password,
        }, {
          withCredentials: true,
        });
        const token = response.data.access_token;
        localStorage.setItem('access_token', token);

        if (response.data.message === 'Login successful') {
          this.$router.push('/tahome');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
      }
    },
    async loginTeacher() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/login_teacher', {
          Teacher_name: this.teacher_username,
          password: this.teacher_password,
        }, {
          withCredentials: true,
        });

        const token = response.data.access_token;
        localStorage.setItem('access_token', token);

        if (response.data.message === 'Login successful') {
          this.$router.push('/teacherhome');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        if (error.response) {
          alert('An error occurred during login: ' + error.response.data.error);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response received from the server.');
        } else {
          console.error('Error setting up the request:', error.message);
          alert('Error setting up the request: ' + error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
}

.error {
  margin-top: 15px;
  color: red;
}
</style>