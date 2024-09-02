<template>
  <div>
    <h2>Dashboard</h2>

    <label for="taSelect">Select TA:</label>
    <select v-model="selectedTA" id="taSelect">
      <option v-for="ta in tas" :key="ta" :value="ta">
        {{ ta }}
      </option>
    </select>

    <button @click="fetchEvaluationResults" :disabled="!selectedTA">Show Evaluation Results</button>

    <div v-if="teacherEvaluations.length || studentEvaluations.length">
      <h3>Teacher Evaluations</h3>
      <table>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Average Score</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacherEvaluation in teacherEvaluationSummary" :key="teacherEvaluation.Teacher_name">
            <td>{{ teacherEvaluation.Teacher_name }}</td>
            <td>{{ teacherEvaluation.avg_score.toFixed(2) }}</td>
            <td><button @click="toggleDetails('teacher', teacherEvaluation.Teacher_name)">Show Details</button></td>
          </tr>
        </tbody>
      </table>

      <h3>Student Evaluations</h3>
      <table>
        <thead>
          <tr>
            <th>TA Name</th>
            <th>Average Score</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="studentEvaluation in studentEvaluationSummary" :key="studentEvaluation.ta_name">
            <td>{{ studentEvaluation.ta_name }}</td>
            <td>{{ studentEvaluation.avg_score.toFixed(2) }}</td>
            <td><button @click="toggleDetails('student', studentEvaluation.ta_name)">Show Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showDetails">
      <h4>{{ selectedTA }} Evaluation Details</h4>
      <div v-if="selectedType === 'teacher'">
        <h5>Teacher Evaluations</h5>
        <ul>
          <li v-for="evaluation in detailedTeacherEvaluations" :key="evaluation.id">
            <strong>Score:</strong> {{ evaluation.score }}, 
            <strong>Comment:</strong> {{ evaluation.comment }}, 
            <strong>Date:</strong> {{ evaluation.evaluate_date }}, 
            <strong>Evaluator:</strong> {{ evaluation.Teacher_name }}
          </li>
        </ul>
      </div>
      <div v-else>
        <h5>Student Evaluations</h5>
        <ul>
          <li v-for="evaluation in detailedStudentEvaluations" :key="evaluation.id">
            <strong>Score:</strong> {{ evaluation.score }}, 
            <strong>Comment:</strong> {{ evaluation.comment }}, 
            <strong>Evaluator:</strong> {{ evaluation.name }}
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
