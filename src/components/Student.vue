<template>
  <div v-if="currentStudent" class="edit-form py-3">
    <p class="headline">Edit Student</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentStudent.fullname"
        :rules="[(v) => !!v || 'Fullname is required']"
        label="Fullname"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentStudent.gender"
        :rules="[(v) => !!v || 'Gender is required']"
        label="Gender"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentStudent.course"
        :rules="[(v) => !!v || 'Course is required']"
        label="Course"
        required
      ></v-text-field>

      <!--<v-text-field
          v-model="student.semester"
          :rules="[(v) => !!v || 'Semester is required']"
          label="Semester"
          required
        ></v-text-field>

        <v-text-field
          v-model="student.year"
          :rules="[(v) => !!v || 'Year is required']"
          label="Year"
          required
        ></v-text-field>-->

      <label><strong>Status:</strong></label>
      {{ currentStudent.paid ? "Paid" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn v-if="currentStudent.paid"
        @click="updatePaid(false)"
        color="primary" small class="mr-2"
      >
        UnPay
      </v-btn>

      <v-btn v-else
        @click="updatePaid(true)"
        color="primary" small class="mr-2"
      >
        Pay
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteStudent">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateStudent">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Student...</p>
  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";

export default {
  name: "student",
  data() {
    return {
      currentStudent: null,
      message: "",
    };
  },
  methods: {
    getStudent(id) {
      StudentDataService.get(id)
        .then((response) => {
          this.currentStudent = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePaid(status) {
      var data = {
        id: this.currentStudent.id,
        fullname: this.currentStudent.fullname,
        gender: this.currentStudent.gender,
        course: this.currentStudent.course,
        //semester: this.currentStudent.semester,
        //year: this.currentStudent.year,
        published: status,
      };

      StudentDataService.update(this.currentStudent.id, data)
        .then((response) => {
          this.currentStudent.paid = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateStudent() {
      StudentDataService.update(this.currentStudent.id, this.currentStudent)
        .then((response) => {
          console.log(response.data);
          this.message = "The student was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteStudent() {
      StudentDataService.delete(this.currentStudent.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "students" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getStudent(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>