<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" placeholder="Username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        // Replace this with your actual login logic and ensure you get the user's role
        const { role } = await login(username.value, password.value);

        // Redirect based on the role
        if (role === 'TA') {
          router.push({ name: 'tadashboard' });
        } else if (role === 'Teacher') {
          router.push({ name: 'teacherdashboard' });
        } else {
          console.error('Unsupported role');
          alert('Unsupported role');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
      }
    };

    return {
      username,
      password,
      handleLogin
    };
  }
};

async function login(username, password) {
  // Simulate a login process
  if (username === 'ta' && password === 'pass') {
    return { role: 'TA' };
  } else if (username === 'teacher' && password === 'pass') {
    return { role: 'Teacher' };
  } else {
    throw new Error('Invalid credentials');
  }
}
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.login-button {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
