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
            <edu-table :tableColumns="tableColumns" :tableData="allStudent" :totalCount="totalCount" :pageSize="studentModel.pagesize" @pageChange="pageChange" ref="table">
                <template slot="opBtns" slot-scope="scope">
                    <el-button size="mini" @click="operateHandler(scope.row,'editpwd')">修改密码</el-button>
                    <el-button size="mini" @click="operateHandler(scope.row,'edit')">修改信息</el-button>
                    <el-button size="mini" @click="operateHandler(scope.row,'delete')" type="danger">删除</el-button>
                </template>
            </edu-table>
        </div>

        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" center>
            <detail-panel :info="studentInfo" :operate="dialogOperate" :userId="currentUserId" v-on:closeDialog="dialogVisible=false"></detail-panel>
        </el-dialog>

        <!-- 修改密码 -->
        <el-dialog :visible.sync="dialogPassword" width="600px" top="0" center custom-class="edu-fix share center" title="修改密码" :userId="currentUserId" :username="currentUsername">
            <pass-word></pass-word>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogPassword = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ClassList from "@/components/ClassList";
// import { FetchStudents } from "@/api/student";
import studentService from "@/api/student";
import table from "@/components/table";
import DetailPanel from "./detail";
import PassWord from "@/components/Password";
export default {
    components: {
        ClassList,
        "edu-table": table,
        DetailPanel,
        PassWord
    },
    created() {
    },
    mounted() {
        console.log(this.userinfo.school);
        console.log(this.commParam);
        this.getStudentList(this.commParam);
    },
    data() {
        return {
            studentList: [],
            dialogVisible: false,
            dialogTitle: "",
            dialogOperate: "",
            dialogPassword: false,
            currentUserId: "",
            currentUsername: "",
            studentInfo: {
                _id: String,
                username: String,
                password: String,
                schoolCode: String,
                mail: String,
                phone: String,
                status: String,
                createAt: String
            },
            studentModel: {
                subject: "",
                curr_page: 1,
                pagesize: 10,
                type: "page"
            },
            tableColumns: [
                { prop: "username", label: this.$t('student.username'), width: '190' },
                { prop: "school", label: this.$t('student.school'), width: '90' },
                // { prop: "phone", label: this.$t('student.phone'), width: '140' },
                // { prop: "mail", label: this.$t('student.mail'), width: '140' },
                {                    prop: "articleLevel", label: this.$t('student.article'), width: '140',
                    template: (row) => {
                        if (!row.articleLevel) {
                            return "";
                        }
                        return row.articleLevel.join(",");
                    }
                },
                { prop: "group", label: this.$t('student.group'), width: '140' },
                { prop: "createdAt", label: this.$t('student.createdAt'), width: '230' },
                { label: "操作", slotName: 'opBtns', width: '170' }
            ]
        };
    },
    methods: {
        btnSearchClickHandler() { },
        pageChange() { },
        classListClick(info) {
            console.log("需要获取新数据，id为", info._id);
        },
        operateHandler(row, opt) {
            this.studentInfo = row;
            switch (opt) {
                case "create":
                    this.studentInfo = {};
                    this.studentInfo.username = "";
                    this.studentInfo.password = "";
                    this.studentInfo.schoolCode = "";
                    this.studentInfo.phone = "";
                    this.studentInfo.mail = "";
                    this.studentInfo.status = 1;
                    this.dialogVisible = true;
                    this.dialogTitle = this.$t("student.addTitle");
                    this.dialogOperate = opt;
                    break;
                case "view":
                    this.currentUserId = this.studentInfo._id;
                    this.dialogVisible = true;
                    this.dialogTitle = this.$t("student.view");
                    this.dialogOperate = opt;
                    break;
                case "editpwd":
                    this.currentUserId = this.studentInfo._id;
                    this.currentUsername = this.studentInfo.username;
                    this.dialogPassword = true;
                    break;
                case "delete":
                    break;
            }
        },
        ...mapActions(["getGroupList", "getStudentList"])
    },
    // created() {
    //     studentService.fetchStudents().then(res => {
    //         this.studentList = res.students;
    //     });
    // },
    computed: {
        commParam() {
            return { school: this.userinfo.school }
        },
        ...mapGetters({
            tableData: 'groupList',
            totalCount: 'groupCount',
            userinfo: "userinfo",
            allStudent: "allStudent"
        })
    }
}
</script>

<style lang="scss" scoped>
// .main {
//   width: 100%;
//   height: auto;
// }
.leftContainer {
  float: left;
  //   height: auto;
}
.rightContainer {
  //   width: auto;
  float: right;
  //   height: auto;
}
</style>