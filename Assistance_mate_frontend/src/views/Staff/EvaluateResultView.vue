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
            <th>TA Name</th>
            <th>Average Score</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacherEvaluation in teacherEvaluationSummary" :key="teacherEvaluation.ta_name">
            <td>{{ teacherEvaluation.ta_name }}</td>
            <td>{{ teacherEvaluation.avg_score.toFixed(2) }}</td>
            <td>
              <button @click="toggleDetails('teacher', teacherEvaluation.ta_name)">
                {{ showTeacherDetails[teacherEvaluation.ta_name] ? 'Hide Details' : 'Show Details' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showTeacherDetails[teacherEvaluationSummary[0]?.ta_name]">
        <h4>Teacher Evaluation Details</h4>
        <table>
          <thead>
            <tr>
              <th>TA Name</th>
              <th>Score</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evaluation in detailedTeacherEvaluations" :key="evaluation.id">
              <td>{{ evaluation.ta_name }}</td>
              <td>{{ evaluation.score }}</td>
              <td>{{ evaluation.comment }}</td>
              <td>{{ evaluation.evaluate_date }}</td>
              <td>{{ evaluation.Teacher_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>

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
            <td>
              <button @click="toggleDetails('student', studentEvaluation.ta_name)">
                {{ showStudentDetails[studentEvaluation.ta_name] ? 'Hide Details' : 'Show Details' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showStudentDetails[studentEvaluationSummary[0]?.ta_name]">
        <h4>Student Evaluation Details</h4>
        <table>
          <thead>
            <tr>
              <th>TA Name</th>
              <th>Score</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Student</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evaluation in detailedStudentEvaluations" :key="evaluation.id">
              <td>{{ evaluation.ta_name }}</td>
              <td>{{ evaluation.score }}</td>
              <td>{{ evaluation.comment }}</td>
              <td>{{ evaluation.evaluate_date }}</td>
              <td>{{ evaluation.evaluator_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tas: [], // This will be populated with TA names from the backend
      selectedTA: '',
      teacherEvaluations: [],
      studentEvaluations: [],
      teacherEvaluationSummary: [],
      studentEvaluationSummary: [],
      detailedTeacherEvaluations: [],
      detailedStudentEvaluations: [],
      showTeacherDetails: {},
      showStudentDetails: {}
    };
  },
  created() {
    this.fetchTAs();
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
        this.prepareSummaries();
      })
      .catch(error => console.error('Error fetching evaluations:', error));
    },
    prepareSummaries() {
      this.teacherEvaluationSummary = this.createSummary(this.teacherEvaluations, 'ta_name');
      this.studentEvaluationSummary = this.createSummary(this.studentEvaluations, 'ta_name');
    },
    createSummary(evaluations, nameField) {
      const summary = evaluations.reduce((acc, evaluation) => {
        const name = evaluation[nameField];
        if (!acc[name]) {
          acc[name] = { [nameField]: name, totalScore: 0, count: 0 };
        }
        acc[name].totalScore += evaluation.score;
        acc[name].count += 1;
        return acc;
      }, {});

      return Object.values(summary).map(item => ({
        ...item,
        avg_score: item.totalScore / item.count
      }));
    },
    toggleDetails(type, name) {
      if (type === 'teacher') {
        this.showTeacherDetails[name] = !this.showTeacherDetails[name];
        if (this.showTeacherDetails[name]) {
          this.detailedTeacherEvaluations = this.teacherEvaluations.filter(e => e.ta_name === name);
        }
      } else if (type === 'student') {
        this.showStudentDetails[name] = !this.showStudentDetails[name];
        if (this.showStudentDetails[name]) {
          this.detailedStudentEvaluations = this.studentEvaluations.filter(e => e.ta_name === name);
        }
      }
    }
  }
};
</script>
