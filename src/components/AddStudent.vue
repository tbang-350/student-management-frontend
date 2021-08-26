<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Student</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="student.fullname"
          :rules="[(v) => !!v || 'Fullname is required']"
          label="Fullname"
          required
        ></v-text-field>

        <v-text-field
          v-model="student.gender"
          :rules="[(v) => !!v || 'Gender is required']"
          label="Gender"
          required
        ></v-text-field>

        <v-text-field
          v-model="student.course"
          :rules="[(v) => !!v || 'Course is required']"
          label="Course"
          required
        ></v-text-field>

        <v-text-field
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
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveStudent">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle>
          Click the button to add new Student.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newStudent">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";

export default {
  name: "add-student",
  data() {
    return {
      student: {
        id: null,
        fullname: "",
        gender: "",
        course: "",
        semester: "",
        year: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveStudent() {
      var data = {
        fullname: this.student.fullname,
        gender: this.student.gender,
        course: this.student.course,
        semester: this.student.semester,
        year: this.student.year,
      };

      StudentDataService.create(data)
        .then((response) => {
          this.student.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newStudent() {
      this.submitted = false;
      this.student = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>