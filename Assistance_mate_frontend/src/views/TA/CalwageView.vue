<template>
  <div class="wage-calculator">
    <h1 class="title">Calculate Wages</h1>
    <form @submit.prevent="calculateWage" class="wage-form">
      <div class="input-group">
        <label for="userType">User Type:</label>
        <select id="userType" v-model="userType" required>
          <option disabled value="">Please select Type</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduated">Graduated</option>
        </select>
      </div>
      <div class="input-group">
        <label for="section">Section:</label>
        <select id="section" v-model="section" required>
          <option disabled value="">Please select Section</option>
          <option value="thai">Thai Section</option>
          <option value="inter">Inter Section</option>
          <option value="lab" v-if="userType === 'graduated'">Lab Lecturer</option>
        </select>
      </div>
      <div class="input-group">
        <label for="hours">Hours Worked:</label>
        <input
          type="number"
          id="hours"
          v-model.number="hours"
          min="0"
          step="1"
          placeholder="Enter hours worked"
          required
        />
      </div>
      <div class="input-group">
        <label for="minutes">Minutes Worked:</label>
        <input
          type="number"
          id="minutes"
          v-model.number="minutes"
          min="0"
          max="59"
          step="1"
          placeholder="Enter minutes worked"
          required
        />
      </div>
      <div class="input-group">
        <label for="weeks">Total Weeks:</label>
        <input
          type="number"
          id="weeks"
          v-model.number="weeks"
          min="1"
          placeholder="Enter total weeks"
          required
        />
      </div>
      <button type="submit" class="calculate-button">Calculate Total Wage</button>
    </form>
    <div v-if="totalWage !== null" class="result">
      <h2>Total Wage: THB {{ totalWage.toFixed(2) }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculateWage',
  data() {
    return {
      userType: '',
      section: '',
      hours: 0,
      minutes: 0,
      weeks: 0,
      totalWage: null,
      rates: {
        undergraduate: {
          thai: 90,
          inter: 120
        },
        graduated: {
          thai: 200,
          inter: 300,
          lab: 450
        }
      }
    }
  },
  methods: {
    calculateWage() {
      const rate = this.rates[this.userType][this.section];
      const totalHours = this.hours + (this.minutes / 60);
      this.totalWage = totalHours * this.weeks * rate;
    }
  }
}
</script>

<style scoped>
.wage-calculator {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.wage-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

input[type='number'],
select {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type='number']:focus,
select:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

.calculate-button {
  width: 100%;
  padding: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.calculate-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f5e9;
  border-radius: 8px;
  text-align: center;
  font-size: 1.3em;
  color: #2e7d32;
}

h2 {
  margin: 0;
  font-weight: bold;
}
</style>
