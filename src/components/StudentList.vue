<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="course" label="Search by Course"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchCourse">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Students</v-card-title>

        <v-data-table
          :headers="headers"
          :items="students"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editStudent(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteStudent(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="students.length > 0">
          <v-btn small color="error" @click="removeAllStudents">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import StudentDataService from "../services/StudentDataService";
export default {
  name: "students-list",
  data() {
    return {
      students: [],
      fullname: "",
      headers: [
        { text: "Student", align: "start", sortable: false, value: "fullname" },
        { text: "Gender", value: "gender", sortable: false },
        { text: "Course", value: "course", sortable: false },
        { text: "Semester", value: "semester", sortable: false },
        { text: "Year", value: "year", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retriveStudents() {
      StudentDataService.getAll()
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retriveStudents();
    },

    removeAllStudents() {
      StudentDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchCourse() {
      StudentDataService.findByCourse(this.course)
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editStudent(id) {
      this.$router.push({ name: "student-details", params: { id: id } });
    },

    deleteStudent(id) {
      StudentDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayStudent(student) {
      return {
        id: student.id,
        fullname: student.fullname.length > 30 ? student.fullname.substr(0, 30) + "..." : student.fullname,
        gender: student.gender.length > 30 ? student.gender.substr(0, 30) + "..." : student.gender,
        course: student.course.length > 30 ? student.course.substr(0, 30) + "..." : student.course,
        semester: student.semester.length > 30 ? student.semester.substr(0, 30) + "..." : student.semester,
        year: student.year.length > 30 ? student.year.substr(0, 30) + "..." : student.year,
        status: student.paid ? "Paid" : "Pending",
      };
    },
  },
  mounted() {
    this.retriveStudents();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>