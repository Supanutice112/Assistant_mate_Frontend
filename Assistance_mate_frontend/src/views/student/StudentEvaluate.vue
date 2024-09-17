<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Evaluate Teaching Assistant</h2>

    <!-- Evaluation Form in a Table -->
    <form @submit.prevent="submitEvaluation">
      <table class="w-full bg-white border rounded shadow-md">
        <tbody>
          <!-- Course Selection -->
          <tr>
            <td class="p-3 border-t border-gray-200 w-1/3"><label for="course" class="font-medium">Select Course</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="evaluation.course" @change="fetchSections" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a course</option>
                <option v-for="course in courses" :key="course.courseid" :value="course.courseid">
                  {{ course.courseid }} - {{ course.course_name }}
                </option>
              </select>
            </td>
          </tr>

          <!-- Section Selection -->
          <tr v-if="evaluation.course">
            <td class="p-3 border-t border-gray-200"><label for="section" class="font-medium">Select Section</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="evaluation.section" @change="fetchTAs" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a section</option>
                <option v-for="section in sections" :key="section.section" :value="section.section">
                  {{ section.section }}
                </option>
              </select>
            </td>
          </tr>

          <!-- TA Selection -->
          <tr v-if="evaluation.course && evaluation.section">
            <td class="p-3 border-t border-gray-200"><label for="taName" class="font-medium">Select TA</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="evaluation.taName" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a TA</option>
                <option v-for="ta in tas" :key="ta.ta_id" :value="ta.ta_name">
                  {{ ta.ta_name }}
                </option>
              </select>
            </td>
          </tr>

          <!-- Question 1: Responsiveness to Questions -->
          <tr v-if="evaluation.course && evaluation.section && evaluation.taName">
            <td class="p-3 border-t border-gray-200"><label for="question1" class="font-medium">Responsiveness to Questions (1-5)</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="evaluation.question1" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a score</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </td>
          </tr>

          <!-- Question 2: Clarity of Explanation -->
          <tr v-if="evaluation.course && evaluation.section && evaluation.taName">
            <td class="p-3 border-t border-gray-200"><label for="question2" class="font-medium">Clarity of Explanation (1-5)</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="evaluation.question2" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a score</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </td>
          </tr>

          <!-- Question 3: Punctuality of Attendance -->
          <tr v-if="evaluation.course && evaluation.section && evaluation.taName">
            <td class="p-3 border-t border-gray-200"><label for="question3" class="font-medium">Punctuality of Attendance (1-5)</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="evaluation.question3" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a score</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </td>
          </tr>

          <!-- Display Average Score -->
          <tr v-if="evaluation.question1 && evaluation.question2 && evaluation.question3">
            <td class="p-3 border-t border-gray-200 font-bold">Average Score:</td>
            <td class="p-3 border-t border-gray-200">{{ averageScore }}</td>
          </tr>

          <!-- Comment Input -->
          <tr v-if="evaluation.course && evaluation.section && evaluation.taName">
            <td class="p-3 border-t border-gray-200"><label for="comment" class="font-medium">Comments</label></td>
            <td class="p-3 border-t border-gray-200">
              <textarea v-model="evaluation.comment" class="mt-2 p-2 border rounded w-full" rows="4" placeholder="Write your comments here" required></textarea>
            </td>
          </tr>

          <!-- Submit Button -->
          <tr v-if="evaluation.course && evaluation.section && evaluation.taName">
            <td class="p-3 border-t border-gray-200"></td>
            <td class="p-3 border-t border-gray-200 text-right">
              <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>

    <!-- Error/Success Message -->
    <div v-if="message" class="mt-6 text-center text-lg font-semibold" :class="{'text-red-600': !success, 'text-green-600': success}">
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
        name: '', // This will be filled with the logged-in user's name
        course: '',
        section: '',
        taName: '',
        question1: '', // Responsiveness
        question2: '', // Clarity
        question3: '', // Attendance
        comment: ''
      },
      courses: [],
      sections: [],
      tas: [],
      message: '',
      success: false,
    };
  },
  computed: {
    averageScore() {
      const scores = [this.evaluation.question1, this.evaluation.question2, this.evaluation.question3];
      const validScores = scores.filter(score => score >= 1 && score <= 5);
      if (validScores.length === 3) {
        const total = validScores.reduce((sum, score) => sum + score, 0);
        return (total / validScores.length).toFixed(2);  // Calculate and return average with 2 decimal places
      }
      return null;
    }
  },
  created() {
    this.fetchCourses();
    this.fetchUserName();  // Fetch the logged-in user's name
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/courses');
        this.courses = response.data.courses;
      } catch (error) {
        this.message = 'Error fetching courses. Please try again.';
        this.success = false;
      }
    },
    async fetchSections() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/course_sections/${this.evaluation.course}`);
        this.sections = response.data;
      } catch (error) {
        this.message = 'Error fetching sections. Please try again.';
        this.success = false;
      }
    },
    async fetchTAs() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/course_tas/${this.evaluation.course}/${this.evaluation.section}`);
        this.tas = response.data;
      } catch (error) {
        this.message = 'Error fetching TAs. Please try again.';
        this.success = false;
      }
    },
    async fetchUserName() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/current_user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        this.evaluation.name = response.data.username;  // Set the user's name from the response
      } catch (error) {
        this.message = 'Error fetching user name.';
        this.success = false;
      }
    },
    async submitEvaluation() {
      const evaluationPayload = {
        name: this.evaluation.name,
        course: this.evaluation.course,
        section: this.evaluation.section,
        taName: this.evaluation.taName,
        score: this.averageScore,  // Store the average score as the final score
        comment: this.evaluation.comment
      };

      // Debugging log to check payload before submission
      console.log("Payload being submitted: ", evaluationPayload);

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/evaluate_ta', evaluationPayload);
        if (response.status === 200) {
          this.message = 'Evaluation submitted successfully.';
          this.success = true;
          this.resetForm();
        } else {
          this.message = 'Failed to submit evaluation.';
          this.success = false;
        }
      } catch (error) {
        console.error('Error submitting evaluation:', error);
        this.message = 'Error submitting evaluation. Please try again.';
        this.success = false;
      }
    },
    resetForm() {
      this.evaluation = {
        name: this.evaluation.name,  // Keep the name from the logged-in user
        course: '',
        section: '',
        taName: '',
        question1: '',
        question2: '',
        question3: '',
        comment: ''
      };
      this.sections = [];
      this.tas = [];
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
}

table {
  width: 100%;
  padding: auto;
}

td, th {
  padding: 14px;
}

textarea {
  resize: none;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2563eb;
}
</style>
