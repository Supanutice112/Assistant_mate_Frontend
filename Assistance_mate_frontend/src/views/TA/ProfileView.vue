<template>
  <div class="profile-container">
    <h1>User Profile</h1>
    <div class="profile-card">
      <img :src="user.profilePicture || defaultProfilePic" alt="Profile Picture" class="profile-picture"/>
      <div class="user-info">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <p>Location: {{ user.location }}</p>
        <button @click="editProfile">Edit Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        location: 'Somewhere, Earth',
        profilePicture: ''
      },
      defaultProfilePic: 'https://via.placeholder.com/150'
    };
  },
  methods: {
    editProfile() {
      // Placeholder for edit profile logic
      alert('Edit profile clicked!');
    }
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.profile-card {
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.user-info h2 {
  margin: 0;
  color: #333;
}

.user-info p {
  margin: 5px 0;
  color: #666;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
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
