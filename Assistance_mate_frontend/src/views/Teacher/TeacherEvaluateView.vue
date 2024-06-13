<template>
    <div class="evaluate">
      <h1>Evaluate Teaching Assistant</h1>
      <form @submit.prevent="submitEvaluation">
        <div class="form-group">
          <label for="course">Course:</label>
          <select v-model="evaluation.course_id" required>
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="ta">Teaching Assistant:</label>
          <select v-model="evaluation.ta_id" required>
            <option v-for="ta in tas" :key="ta.id" :value="ta.id">
              {{ ta.name }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="rating">Rating:</label>
          <select v-model="evaluation.rating" required>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="comments">Comments:</label>
          <textarea v-model="evaluation.comments" rows="4" placeholder="Enter your comments here..."></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">Submit Evaluation</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        courses: [],
        tas: [],
        evaluation: {
          course_id: '',
          ta_id: '',
          rating: '',
          comments: ''
        }
      };
    },
    methods: {
      fetchCourses() {
        axios.get('/api/courses')
          .then(response => {
            this.courses = response.data;
          })
          .catch(error => {
            console.error('Error fetching courses:', error);
          });
      },
      fetchTAs() {
        axios.get('/api/tas')
          .then(response => {
            this.tas = response.data;
          })
          .catch(error => {
            console.error('Error fetching TAs:', error);
          });
      },
      submitEvaluation() {
        axios.post('/api/evaluate', this.evaluation)
          .then(() => {
            alert('Evaluation submitted successfully!');
            this.resetForm();
          })
          .catch(error => {
            console.error('Error submitting evaluation:', error);
          });
      },
      resetForm() {
        this.evaluation = {
          course_id: '',
          ta_id: '',
          rating: '',
          comments: ''
        };
      }
    },
    created() {
      this.fetchCourses();
      this.fetchTAs();
    }
  };
  </script>
  
  <style scoped>
  .evaluate {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  