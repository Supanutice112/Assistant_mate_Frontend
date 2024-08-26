<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Course Evaluation</h2>
    
    <!-- Course Selection -->
    <div class="mb-4">
      <label for="course" class="block text-lg font-medium">Select Course</label>
      <select v-model="selectedCourse" @change="fetchTAs" class="mt-2 p-2 border rounded w-full">
        <option v-for="course in courses" :key="course.courseid" :value="course.courseid">
          {{ course.course_name }}
        </option>
      </select>
    </div>

    <!-- TA Selection -->
    <div v-if="selectedCourse" class="mb-4">
      <label for="ta" class="block text-lg font-medium">Select TA</label>
      <select v-model="selectedTA" class="mt-2 p-2 border rounded w-full">
        <option v-for="ta in tas" :key="ta.ta_id" :value="ta.ta_id">
          {{ ta.ta_name }}
        </option>
      </select>
    </div>

    <!-- Evaluation Form -->
    <div v-if="selectedCourse && selectedTA" class="mb-4">
      <form @submit.prevent="submitEvaluation">
        <label for="score" class="block text-lg font-medium">Score</label>
        <input type="number" v-model="score" min="0" max="10" required class="mt-2 p-2 border rounded w-full" />

        <label for="comment" class="block text-lg font-medium mt-4">Comment</label>
        <textarea v-model="comment" required class="mt-2 p-2 border rounded w-full" rows="4"></textarea>

        <button type="submit" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
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
      score: null,
      comment: '',
    };
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
          score: this.score,
          comment: this.comment,
          course_id: this.selectedCourse,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            alert("Evaluation submitted successfully!");
            // Reset form
            this.selectedCourse = null;
            this.selectedTA = null;
            this.score = null;
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
  max-width: 600px;
  margin: 0 auto;
}
</style>