<template>
    <div class="main">
        <h3>学生管理</h3>
        <!-- 过滤器 -->
        <div>
            <div class="filter-container">
                <el-input ref="tiSearch" type="input" :placeholder="$t('student.searchName')" class="filter-item" style="width:200px" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" class="filter-item" @click="btnSearchClickHandler">{{$t('student.search')}}</el-button>
                <el-button type="primary" icon="el-icon-edit" class="filter-item" style="margin-left: 10px;" @click="operateHandler(null,'create')">{{$t('student.add')}}</el-button>
            </div>
        </div>
        <div class="leftContainer">
            <class-list v-on:groupListClick="classListClick"></class-list>
        </div>
        <div class="rightContainer">
            <edu-table :tableColumns="tableColumns" :tableData="studentList" :totalCount="totalCount" :pageSize="studentModel.pagesize" @pageChange="pageChange" ref="table">
            </edu-table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ClassList from "@/components/ClassList";
// import { FetchStudents } from "@/api/student";
import studentService from "@/api/student";
import table from "@/components/table";
export default {
    components: {
        ClassList,
        "edu-table": table
    },
    created() {
        this.getGroupList();
    },
    data() {
        return {
            studentList: [],
            studentModel: {
                subject: "",
                curr_page: 1,
                pagesize: 10,
                type: "page"
            },
            tableColumns: [
                { prop: "secondName", label: this.$t('student.secondName'), width: '90' },
                { prop: "firstName", label: this.$t('student.firstName'), width: '90' },
                { prop: "school", label: this.$t('student.school'), width: '90' },
                { prop: "group", label: this.$t('student.group'), width: '90' },
            ]
        };
    },
    methods: {
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        btnSearchClickHandler() { },
        pageChange() { },
        click() { },
        classListClick(info) {
            console.log("需要获取新数据，id为", info._id);
        },
        ...mapActions(["getGroupList"])
    },
    created() {
        studentService.fetchStudents().then(res => {
            this.studentList = res.students;
        });
    },
    computed: mapGetters({ tableData: 'groupList', totalCount: 'groupCount', })
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;
}
.leftContainer {
  width: 400px;
  float: left;
  height: auto;
}
.rightContainer {
  width: auto;
  float: right;
  height: auto;
}
</style>