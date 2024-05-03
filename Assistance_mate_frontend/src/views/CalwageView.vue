<template>
    <div class="wage-calculator">
      <h1>Calculate Wages</h1>
      <form @submit.prevent="calculateWage" class="wage-form">
        <div class="input-group">
          <label for="userType">User Type:</label>
          <select id="userType" v-model="userType" required>
            <option disabled value="">Please select one</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>
        <div class="input-group">
          <label for="section">Section:</label>
          <select id="section" v-model="section" required>
            <option disabled value="">Please select one</option>
            <option value="thai">Thai Section</option>
            <option value="inter">Inter Section</option>
            <option value="lab" v-if="userType === 'graduated'">Lab Lecturer</option>
          </select>
        </div>
        <div class="input-group">
          <label for="hours">Hours Worked per Week:</label>
          <input
            type="number"
            id="hours"
            v-model.number="hours"
            min="1"
            step="1"
            placeholder="Enter hours worked per week"
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
        <button type="submit">Calculate Total Wage</button>
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
        this.totalWage = this.hours * this.weeks * rate;
      }
    }
  }
  </script>
  
  <style scoped>
  .wage-calculator {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
    margin-bottom: 5px;
  }
  
  input[type='number'],
  select {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
  }
  
  input[type='number']:focus,
  select:focus {
    border-color: #4caf50;
    outline: none;
  }
  
  button {
    width: 100%;
    padding: 12px;
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
  
  .result {
    margin-top: 20px;
    padding: 10px;
    background-color: #e8f5e9;
    border-radius: 4px;
    text-align: center;
  }
  
  h2 {
    color: #2e7d32;
  }
  </style>
  