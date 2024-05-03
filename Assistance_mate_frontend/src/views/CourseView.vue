<template>
    <div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Course</th>
              <th>Professor</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="index in 5" :key="index">
              <th>{{ index }}</th>
              <td>
                <div class="flex items-center gap-3">
                  <div>
                    <div class="font-bold">PROGRAMMING LOGICAL THINKING</div>
                    <div class="text-sm opacity-50">511021</div>
                  </div>
                </div>
              </td>
              <td>
                Supanut Maneeyot
                <br />
                <span class="badge badge-ghost badge-sm">International</span>
              </td>
              <td>11:00 AM - 13:00</td>
              <th>
                <router-link to="/attendance">
                  <button class="btn btn-ghost btn-xs">Attendance</button>
                </router-link>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  