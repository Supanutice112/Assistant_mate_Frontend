<template>
  <div class="p-4 max-w-6xl mx-auto shadow-lg rounded-lg bg-white">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Disbursement form for Graduate</h2>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="loading" class="text-center">Loading attendance records...</div>
    <table v-else class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 p-2">Name</th>
          <th class="border border-gray-300 p-2">Date</th>
          <th class="border border-gray-300 p-2">Course</th>
          <th class="border border-gray-300 p-2">Hours Worked</th>
          <th class="border border-gray-300 p-2">Wage per Hour</th>
          <th class="border border-gray-300 p-2">Total</th>
          <th class="border border-gray-300 p-2">Recipient</th>
          <th class="border border-gray-300 p-2">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in attendance" :key="index" class="hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ record.ta_name }}</td>
          <td class="border border-gray-300 p-2">{{ formatDate(record.date) }}</td>
          <td class="border border-gray-300 p-2">{{ record.course_id }}</td>
          <td class="border border-gray-300 p-2">{{ record.hours_worked }}</td>
          <td class="border border-gray-300 p-2">{{ record.wage }}</td>
          <td class="border border-gray-300 p-2">{{ record.calwage }}</td>
          <td class="border border-gray-300 p-2">{{ record.ta_name }}</td>
          <td class="border border-gray-300 p-2"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-gray-100">
          <td colspan="4" class="border border-gray-300 p-2 font-bold text-right">Total Amount</td>
          <td class="border border-gray-300 p-2 font-bold text-right">{{ totalAmount }}</td>
          <td colspan="3" class="border border-gray-300 p-2 font-bold text-center">({{ totalAmountText }})</td>
        </tr>
      </tfoot>
    </table>

    <div class="mt-6 flex justify-between">
      <!-- Back button -->
      <router-link to="/form" class="button bg-gray-600 hover:bg-gray-800">Back</router-link>

      <!-- Print button -->
      <button @click="printForm" class="button bg-blue-600 hover:bg-blue-800">Print</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attendance: [],
      totalAmount: 0,
      totalAmountText: '',
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchAttendance();
  },
  methods: {
    async fetchAttendance() {
      this.loading = true;
      try {
        const response = await fetch('http://127.0.0.1:5000/api/attendance_summary', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch attendance records.');
        }
        const data = await response.json();
        this.attendance = data.attendance.map(record => {
          const minutesWorked = record.minutes_worked;
          const hoursWorked = (minutesWorked / 60).toFixed(2);
          const wageRates = {
            'stu_thai': 90,
            'stu_inter': 120,
            'grad_thai': 200,
            'grad_inter': 300,
            'lecturer': 450
          };
          const ratePerHour = wageRates[record.course_type] || 0;
          const wage = ratePerHour;
          const calwage = ratePerHour * (minutesWorked / 60);

          return {
            ...record,
            hours_worked: hoursWorked,
            calwage: calwage.toFixed(2),
            wage: wage.toFixed(2)
          };
        });

        this.calculateTotalAmount();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    calculateTotalAmount() {
      this.totalAmount = this.attendance.reduce((sum, record) => sum + parseFloat(record.calwage), 0).toFixed(2);
      this.totalAmountText = this.convertNumberToThaiText(this.totalAmount);
    },
    convertNumberToThaiText(amount) {
      const numberText = {
        '0': 'ศูนย์',
        '1': 'หนึ่ง',
        '2': 'สอง',
        '3': 'สาม',
        '4': 'สี่',
        '5': 'ห้า',
        '6': 'หก',
        '7': 'เจ็ด',
        '8': 'แปด',
        '9': 'เก้า'
      };

      const unitsText = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
      const bahtText = "บาทถ้วน";

      let integerPart = Math.floor(amount).toString();
      let result = '';
      let length = integerPart.length;

      for (let i = 0; i < length; i++) {
        let digit = integerPart.charAt(i);
        let unit = length - i - 1;

        if (digit !== '0') {
          if (unit === 1 && digit === '1') {
            result += 'สิบ';
          } else if (unit === 1 && digit === '2') {
            result += 'ยี่สิบ';
          } else if (unit === 0 && digit === '1' && length > 1) {
            result += 'เอ็ด';
          } else {
            result += numberText[digit] + unitsText[unit];
          }
        }
      }

      result += bahtText;
      return result;
    },
    formatDate(dateString) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    },
    printForm() {
      window.print();
    }
  }
};
</script>

<style scoped>
.p-4 {
  padding: 1rem;
}

.max-w-6xl {
  max-width: 72rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.75rem;
}

.bg-white {
  background-color: #fff;
}

.text-gray-800 {
  color: #2d3748;
}

.text-gray-700 {
  color: #4a5568;
}

.bg-gray-600 {
  background-color: #4a5568;
}

.bg-gray-800 {
  background-color: #2d3748;
}

.bg-blue-600 {
  background-color: #3182ce;
}

.bg-blue-800 {
  background-color: #2b6cb0;
}

.text-white {
  color: #fff;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.table-auto {
  table-layout: auto;
}

.border-collapse {
  border-collapse: collapse;
}

.border {
  border-width: 1px;
}

.border-gray-300 {
  border-color: #d2d6dc;
}

.p-4 {
  padding: 1rem;
}

.p-3 {
  padding: 0.75rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.transition-colors {
  transition: background-color 0.2s;
}

.button {
  padding: 0.75rem 1.5rem;
  color: white;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  transition: background-color 0.3s ease;
}

.button:hover {
  cursor: pointer;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.ml-4 {
  margin-left: 1rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.text-center {
  text-align: center;
}


</style>
