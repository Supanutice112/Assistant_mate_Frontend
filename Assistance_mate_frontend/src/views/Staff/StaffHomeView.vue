<template>
  <div>
    <h2>Dashboard</h2>
    <button @click="fetchEvaluationResults">Show Evaluation Results</button>

    <div v-if="teacherEvaluations.length || studentEvaluations.length">
      <h3>Teacher Evaluations</h3>
      <table>
        <tr>
          <th>Score</th>
          <th>Comment</th>
          <th>Date</th>
          <th>Teacher</th>
        </tr>
        <tr v-for="evaluation in teacherEvaluations" :key="evaluation.id">
          <td>{{ evaluation.score }}</td>
          <td>{{ evaluation.comment }}</td>
          <td>{{ evaluation.evaluate_date }}</td>
          <td>{{ evaluation.Teacher_name }}</td>
        </tr>
      </table>

      <h3>Student Evaluations</h3>
      <table>
        <tr>
          <th>Score</th>
          <th>Comment</th>
          <th>Date</th>
          <th>Student</th>
        </tr>
        <tr v-for="evaluation in studentEvaluations" :key="evaluation.id">
          <td>{{ evaluation.score }}</td>
          <td>{{ evaluation.comment }}</td>
          <td>{{ evaluation.evaluate_date }}</td>
          <td>{{ evaluation.evaluator_name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacherEvaluations: [],
      studentEvaluations: [],
    };
  },
  methods: {
    fetchEvaluationResults() {
      // Replace these with the actual course_id and ta_name values you want to use
      const courseId = 101;
      const taName = "John Doe";

      fetch('/api/evaluate_results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          course_id: courseId,
          ta_name: taName
        })
      })
      .then(response => response.json())
      .then(data => {
        this.teacherEvaluations = data.teacher_evaluations;
        this.studentEvaluations = data.student_evaluations;
      })
      .catch(error => console.error('Error fetching evaluations:', error));
    }
  }
};
</script>
