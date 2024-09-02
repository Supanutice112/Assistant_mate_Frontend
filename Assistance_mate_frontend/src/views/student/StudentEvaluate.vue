<template>
  <div class="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
    <h2 class="text-3xl font-extrabold text-center mb-6 text-gray-800">Evaluate Teaching Assistant</h2>

    <!-- Evaluation Form -->
    <form @submit.prevent="submitEvaluation">
      <div class="space-y-4">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-lg font-medium text-gray-700">Your Name</label>
          <input type="text" v-model="evaluation.name" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your name" required />
        </div>

        <!-- Course Selection -->
        <div>
          <label for="course" class="block text-lg font-medium text-gray-700">Select Course</label>
          <select v-model="evaluation.course" @change="fetchSections" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            <option disabled value="">Please select a course</option>
            <option v-for="course in courses" :key="course.courseid" :value="course.courseid">
              {{ course.courseid }} - {{ course.course_name }}
            </option>
          </select>
        </div>

        <!-- Section Selection -->
        <div v-if="evaluation.course">
          <label for="section" class="block text-lg font-medium text-gray-700">Select Section</label>
          <select v-model="evaluation.section" @change="fetchTAs" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            <option disabled value="">Please select a section</option>
            <option v-for="section in sections" :key="section.section" :value="section.section">
              {{ section.section }}
            </option>
          </select>
        </div>

        <!-- TA Selection -->
        <div v-if="evaluation.course && evaluation.section">
          <label for="taName" class="block text-lg font-medium text-gray-700">Select TA</label>
          <select v-model="evaluation.taName" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            <option disabled value="">Please select a TA</option>
            <option v-for="ta in tas" :key="ta.ta_id" :value="ta.ta_name">
              {{ ta.ta_name }}
            </option>
          </select>
        </div>

        <!-- Score Input -->
        <div v-if="evaluation.course && evaluation.section && evaluation.taName">
          <label for="score" class="block text-lg font-medium text-gray-700">Score (1-5)</label>
          <input type="number" v-model="evaluation.score" min="1" max="5" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter a score between 1 and 5" required />
        </div>

        <!-- Comment Input -->
        <div v-if="evaluation.course && evaluation.section && evaluation.taName">
          <label for="comment" class="block text-lg font-medium text-gray-700">Comments</label>
          <textarea v-model="evaluation.comment" class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="4" placeholder="Write your comments here" required></textarea>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-6 text-center">
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
          :disabled="!canSubmit"
        >
          Submit Evaluation
        </button>
      </div>
    </form>

    <!-- Error/Success Message -->
    <div v-if="message" class="mt-6 text-center text-lg font-semibold text-red-600">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      evaluation: {
        name: '',
        course: '', // Set to an empty string to trigger the placeholder
        section: '',
        taName: '',
        score: '',
        comment: ''
      },
      courses: [],
      sections: [],
      tas: [],
      message: '',
      loading: false,
    };
  },
  computed: {
    canSubmit() {
      return this.evaluation.name && this.evaluation.course && this.evaluation.section && this.evaluation.taName && this.evaluation.score && this.evaluation.comment;
    }
  },
  created() {
    this.fetchCourses();
  },
  methods: {
    async fetchCourses() {
      this.loading = true;
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/courses');
        this.courses = response.data.courses;
      } catch (error) {
        this.message = 'Error fetching courses. Please try again.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchSections() {
      this.loading = true;
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/course_sections/${this.evaluation.course}`);
        this.sections = response.data;
      } catch (error) {
        this.message = 'Error fetching sections. Please try again.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchTAs() {
      this.loading = true;
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/course_tas/${this.evaluation.course}/${this.evaluation.section}`);
        this.tas = response.data;
      } catch (error) {
        this.message = 'Error fetching TAs. Please try again.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async submitEvaluation() {
      this.loading = true;
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/evaluate_ta', this.evaluation);
        if (response.data.message === 'Evaluation submitted successfully') {
          alert('Evaluation submitted successfully.');
          this.resetForm();
        } else {
          this.message = 'Failed to submit evaluation.';
        }
      } catch (error) {
        this.message = 'Error submitting evaluation. Please try again.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.evaluation.name = '';
      this.evaluation.course = ''; // Reset to an empty string
      this.evaluation.section = '';
      this.evaluation.taName = '';
      this.evaluation.score = '';
      this.evaluation.comment = '';
      this.sections = [];
      this.tas = [];
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  background-color: #ffffff;
}

textarea {
  resize: none;
}

button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.text-red-600 {
  color: #e3342f;
}
</style>
