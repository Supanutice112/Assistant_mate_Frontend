<template>
  <div class="evaluation-container p-8 bg-gradient-to-b from-green-50 to-gray-100 min-h-screen">
    <h2 class="text-4xl font-extrabold text-teal-700 mb-8">Evaluation Dashboard</h2>

    <!-- TA Selection Section -->
    <div class="mb-8 flex items-center space-x-4">
      <label for="taSelect" class="text-xl font-medium text-gray-700">Select TA:</label>
      <select 
        v-model="selectedTA" 
        id="taSelect" 
        class="mt-2 p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition">
        <option v-for="ta in tas" :key="ta" :value="ta">{{ ta }}</option>
      </select>
      <button 
        @click="fetchEvaluationResults" 
        :disabled="!selectedTA" 
        class="bg-gradient-to-r from-teal-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-teal-600 hover:to-teal-600 disabled:bg-gray-400 transition duration-300"
      >
        Show Evaluation Results
      </button>
    </div>

    <!-- Evaluation Results Section -->
    <div v-if="teacherEvaluations.length || studentEvaluations.length" class="bg-white p-8 rounded-xl shadow-2xl">
      <!-- Teacher Evaluations -->
      <h3 class="text-2xl font-semibold text-orange-700 mb-6">Teacher Evaluations</h3>
      <table class="min-w-full bg-white table-auto mb-8">
        <thead class="bg-gradient-to-r from-teal-500 to-teal-500 text-white">
          <tr>
            <th class="px-6 py-3">Teacher</th>
            <th class="px-6 py-3">Average Score</th>
            <th class="px-6 py-3">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacherEvaluation in teacherEvaluationSummary" :key="teacherEvaluation.Teacher_name" class="border-b hover:bg-teal-50">
            <td class="px-6 py-4 text-gray-700">{{ teacherEvaluation.Teacher_name }}</td>
            <td class="px-6 py-4 text-gray-700">{{ teacherEvaluation.avg_score.toFixed(2) }}</td>
            <td class="px-6 py-4">
              <button 
                @click="toggleDetails('teacher', teacherEvaluation.Teacher_name)" 
                class="bg-gradient-to-r from-teal-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-600 transition duration-300"
              >
                Show Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Student Evaluations -->
      <h3 class="text-2xl font-semibold text-green-700 mb-6">Student Evaluations</h3>
      <table class="min-w-full bg-white table-auto">
        <thead class="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <tr>
            <th class="px-6 py-3">TA Name</th>
            <th class="px-6 py-3">Average Score</th>
            <th class="px-6 py-3">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="studentEvaluation in studentEvaluationSummary" :key="studentEvaluation.ta_name" class="border-b hover:bg-green-50">
            <td class="px-6 py-4 text-gray-700">{{ studentEvaluation.ta_name }}</td>
            <td class="px-6 py-4 text-gray-700">{{ studentEvaluation.avg_score.toFixed(2) }}</td>
            <td class="px-6 py-4">
              <button 
                @click="toggleDetails('student', studentEvaluation.ta_name)" 
                class="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition duration-300"
              >
                Show Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detailed Evaluation Section -->
    <div v-if="showDetails" class="mt-12 bg-white p-8 rounded-xl shadow-2xl">
      <h4 class="text-3xl font-semibold text-teal-700 mb-6">{{ selectedTA }} Evaluation Details</h4>

      <div v-if="selectedType === 'teacher'" class="mb-8">
        <h5 class="text-2xl font-medium text-orange-700 mb-4">Teacher Evaluations</h5>
        <ul class="space-y-4">
          <li v-for="evaluation in detailedTeacherEvaluations" :key="evaluation.id" class="bg-orange-50 p-6 rounded-lg shadow-md border-l-4 border-orange-500 mb-4">
            <p class="text-xl font-semibold text-teal-700 mb-2"><strong>Score:</strong> {{ evaluation.score }}</p>
            <p class="text-lg text-gray-700 mb-2"><strong>Comment:</strong> {{ evaluation.comment }}</p>
            <p class="text-lg text-gray-500"><strong>Evaluator:</strong> {{ evaluation.Teacher_name }}</p>
          </li>
        </ul>
      </div>

      <div v-else>
        <h5 class="text-2xl font-medium text-green-700 mb-4">Student Evaluations</h5>
        <ul class="space-y-4">
          <li v-for="evaluation in detailedStudentEvaluations" :key="evaluation.id" class="bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-500 mb-4">
            <p class="text-xl font-semibold text-teal-700 mb-2"><strong>Score:</strong> {{ evaluation.score }}</p>
            <p class="text-lg text-gray-700 mb-2"><strong>Comment:</strong> {{ evaluation.comment }}</p>
            <p class="text-lg text-gray-500"><strong>Evaluator:</strong> {{ evaluation.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tas: [], // Populated with TA names from the backend
      selectedTA: '',
      teacherEvaluations: [],
      studentEvaluations: [],
      showDetails: false,
      selectedType: '',
      detailedTeacherEvaluations: [],
      detailedStudentEvaluations: []
    };
  },
  created() {
    this.fetchTAs();
  },
  computed: {
    teacherEvaluationSummary() {
      const summary = {};
      this.teacherEvaluations.forEach(evaluation => {
        if (!summary[evaluation.Teacher_name]) {
          summary[evaluation.Teacher_name] = { scoreSum: 0, count: 0 };
        }
        summary[evaluation.Teacher_name].scoreSum += evaluation.score;
        summary[evaluation.Teacher_name].count += 1;
      });
      return Object.keys(summary).map(teacher => ({
        Teacher_name: teacher,
        avg_score: summary[teacher].scoreSum / summary[teacher].count
      }));
    },
    studentEvaluationSummary() {
      const summary = {};
      this.studentEvaluations.forEach(evaluation => {
        if (!summary[evaluation.ta_name]) {
          summary[evaluation.ta_name] = { scoreSum: 0, count: 0 };
        }
        summary[evaluation.ta_name].scoreSum += evaluation.score;
        summary[evaluation.ta_name].count += 1;
      });
      return Object.keys(summary).map(ta => ({
        ta_name: ta,
        avg_score: summary[ta].scoreSum / summary[ta].count
      }));
    }
  },
  methods: {
    fetchTAs() {
      fetch('http://127.0.0.1:5000/api/get_tas', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
        .then(response => response.json())
        .then(data => {
          this.tas = data.tas;
        })
        .catch(error => console.error('Error fetching TAs:', error));
    },
    fetchEvaluationResults() {
      if (!this.selectedTA) return;

      fetch('http://127.0.0.1:5000/api/evaluate_results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          ta_name: this.selectedTA
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.teacherEvaluations = data.teacher_evaluations || [];
          this.studentEvaluations = data.student_evaluations || [];
        })
        .catch(error => console.error('Error fetching evaluations:', error));
    },
    toggleDetails(type, taName) {
      this.selectedType = type;
      this.showDetails = true;
      if (type === 'teacher') {
        this.detailedTeacherEvaluations = this.teacherEvaluations.filter(e => e.Teacher_name === taName);
      } else {
        this.detailedStudentEvaluations = this.studentEvaluations.filter(e => e.ta_name === taName);
      }
    }
  }
};
</script>

<style scoped>
.evaluation-container {
  max-width: 1200px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 16px;
  text-align: left;
}

th {
  background-color: #f97316;
  color: white;
  font-weight: 600;
}

td {
  border-bottom: 1px solid #e5e7eb;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 8px;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-orange-500 {
  --tw-gradient-from: #f97316;
}

.to-teal-500 {
  --tw-gradient-to: #2dd4bf;
}

.from-green-500 {
  --tw-gradient-from: #10b981;
}

.hover\:from-orange-600:hover {
  --tw-gradient-from: #ea580c;
}

.hover\:to-teal-600:hover {
  --tw-gradient-to: #14b8a6;
}

.hover\:from-green-600:hover {
  --tw-gradient-from: #059669;
}

.hover\:to-teal-600:hover {
  --tw-gradient-to: #0d9488;
}
</style>
