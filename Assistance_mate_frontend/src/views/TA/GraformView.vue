<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Disburstment form for Graduate</h2>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 p-2">Name</th>
          <th class="border border-gray-300 p-2">Date</th>
          <th class="border border-gray-300 p-2">Course</th>
          <th class="border border-gray-300 p-2">Hours Worked</th>
          <th class="border border-gray-300 p-2">ค่าสอนชั่วโมงละ</th>
          <th class="border border-gray-300 p-2">Total</th>
          <th class="border border-gray-300 p-2">ผู้รับเงิน</th>
          <th class="border border-gray-300 p-2">หมายเหตุ</th>
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
          <td colspan="4" class="border border-gray-300 p-2 font-bold text-right">รวมจำนวนเงินที่ขอเบิก</td>
          <td class="border border-gray-300 p-2 font-bold text-right">{{ totalAmount }}</td>
          <td colspan="3" class="border border-gray-300 p-2 font-bold text-center">({{ totalAmountText }})</td>
        </tr>
      </tfoot>
    </table>
    <router-link to="/form" class="button">Back</router-link>
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
      error: null
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
    }
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  color: #fff;
  background-color: #007bff;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.button:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #007bff;
  border-radius: 10rem;
  z-index: -2;
}

.button:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #0056b3;
  transition: all 0.3s;
  border-radius: 10rem;
  z-index: -1;
}

.button:hover {
  color: #fff;
}

.button:hover:before {
  width: 100%;
}

/* Additional Styles */
.table-auto {
  margin-top: 20px;
  font-size: 16px;
}

thead th {
  font-weight: bold;
}

tfoot td {
  font-weight: bold;
}

.hover\\:bg-gray-100:hover {
  background-color: #f7fafc;
}
</style>
