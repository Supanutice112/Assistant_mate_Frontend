<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Course Evaluation</h2>
    
    <!-- Evaluation Form in a Table -->
    <form @submit.prevent="submitEvaluation">
      <table class="w-full bg-white border rounded shadow-md">
        <tbody>
          <!-- Course Selection -->
          <tr>
            <td class="p-3 border-t border-gray-200 w-1/3"><label for="course" class="font-medium">Select Course</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="selectedCourse" @change="fetchTAs" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a course</option>
                <option v-for="course in courses" :key="course.courseid" :value="course.courseid">
                  {{ course.course_name }}
                </option>
              </select>
            </td>
          </tr>
          
          <!-- TA Selection -->
          <tr v-if="selectedCourse">
            <td class="p-3 border-t border-gray-200"><label for="ta" class="font-medium">Select TA</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="selectedTA" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a TA</option>
                <option v-for="ta in tas" :key="ta.ta_id" :value="ta.ta_id">
                  {{ ta.ta_name }}
                </option>
              </select>
            </td>
          </tr>
          
          <tr v-if="selectedCourse && selectedTA">
            <td class="p-3 border-t border-gray-200"><label for="question1" class="font-medium">Responsiveness to Questions?</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="question1" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a score</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </td>
          </tr>
          
          <tr v-if="selectedCourse && selectedTA">
            <td class="p-3 border-t border-gray-200"><label for="question2" class="font-medium">Clarity of Explanation?</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="question2" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a score</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </td>
          </tr>
          
          <tr v-if="selectedCourse && selectedTA">
            <td class="p-3 border-t border-gray-200"><label for="question3" class="font-medium">How the TA attends classes on time?</label></td>
            <td class="p-3 border-t border-gray-200">
              <select v-model="question3" class="mt-2 p-2 border rounded w-full" required>
                <option disabled value="">Please select a score</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </td>
          </tr>
          
          
          <!-- Comment -->
          <tr v-if="selectedCourse && selectedTA">
            <td class="p-3 border-t border-gray-200"><label for="comment" class="font-medium">Comment</label></td>
            <td class="p-3 border-t border-gray-200">
              <textarea v-model="comment" required class="p-2 border rounded w-full" rows="4"></textarea>
            </td>
          </tr>
          
          <!-- Submit Button -->
          <tr v-if="selectedCourse && selectedTA">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      tas: [],
      selectedCourse: null,
      selectedTA: null,
      question1: null,
      question2: null,
      question3: null,
      comment: '',
    };
  },
  computed: {
    averageScore() {
      const scores = [this.question1, this.question2, this.question3];
      const validScores = scores.filter(score => score >= 1 && score <= 5);
      if (validScores.length === 3) {
        const total = validScores.reduce((sum, score) => sum + score, 0);
        return (total / validScores.length).toFixed(2);
      }
      return null;
    }
  },
  methods: {
    fetchCourses() {
      fetch("http://127.0.0.1:5000/api/teacher_courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.courses = data.courses;
        });
    },
    fetchTAs() {
      fetch(`http://127.0.0.1:5000/api/ta_for_course?course_id=${this.selectedCourse}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.tas = data.tas;
        });
    },
    submitEvaluation() {
      fetch("http://127.0.0.1:5000/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          ta_id: this.selectedTA,
          score: this.averageScore,
          comment: this.comment,
          course_id: this.selectedCourse,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            alert("Evaluation submitted successfully!");
            this.selectedCourse = null;
            this.selectedTA = null;
            this.question1 = null;
            this.question2 = null;
            this.question3 = null;
            this.comment = '';
            this.tas = [];
          } else {
            alert("Failed to submit evaluation.");
          }
        });
    },
  },
  mounted() {
    this.fetchCourses();
  },
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

thead th {
  background-color: #f3f4f6;
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
