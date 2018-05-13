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
        <el-row :gutter="8">
            <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}">
                <class-list @classSelected="classListClick"></class-list>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 16}" :xl="{span: 10}">
                <edu-table :tableColumns="tableColumns" :tableData="allStudent" :totalCount="allStudentCount" :pageSize="studentQueryModel.pageSize" @pageChange="pageChange" ref="table">
                    <template slot="opBtns" slot-scope="scope">
                        <el-button size="mini" @click="operateHandler(scope.row,'editpwd')" v-if="userinfo.role === '800' || userinfo.role === '1000'">修改密码</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'edit')">修改信息</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'delete')" type="danger">删除</el-button>
                    </template>
                </edu-table>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" center>
            <detail-panel :info="studentInfo" :operate="dialogOperate" :userId="currentUserId" @closeDialog="dialogVisible=false" @fetchStudentList="fetchStuidentList" :showPage="showPage"></detail-panel>
        </el-dialog>

        <!-- 修改密码 -->
        <el-dialog :visible.sync="dialogPassword" width="600px" top="0" center custom-class="edu-fix share center" :title="this.$t('student.changePassword')" :userInfo="studentInfo">
            <password></password>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogPassword = false">确认</el-button>
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
import Password from "@/components/Password";
export default {
    components: {
        ClassList,
        "edu-table": table,
        DetailPanel,
        Password
    },
    mounted() {
        this.fetchStuidentList();
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
                // _id: "",
                // username: "",
                // password: "",
                // schoolCode: "",
                // mail: "",
                // phone: "",
                // status: 1,
                // createAt: ""
            },
            studentQueryModel: {
                currentPage: 1,
                pageSize: 10,
            },
            tableColumns: [
                { prop: "username", label: this.$t('student.username'), width: '140' },
                { prop: "school", label: this.$t('student.school'), width: '90' },
                {                    prop: "articleLevel", label: this.$t('student.article'), width: '100',
                    template: (row) => {
                        if (!row.articleLevel) {
                            return "";
                        }
                        return row.articleLevel.join(",");
                    }
                },
                {                    prop: "group", label: this.$t('student.group'), width: '140',
                    template: row => {
                        if (!row.group) {
                            return "";
                        }
                        return row.group.name;
                    }                },
                { prop: "createdAt", label: this.$t('student.createdAt'), width: '250' },
                { label: this.$t("student.operate"), slotName: 'opBtns' }
            ],
            showPage: true
        };
    },
    methods: {
        btnSearchClickHandler() { },
        pageChange(e) {
            this.studentQueryModel.currentPage = e;
            this.fetchStuidentList();
        },
        classListClick(id) {
            let query = {};
            query.id = id;
            this.getStudentByClassId(query);
            // studentService.getStudentByClassId(query).then(res => {
            //     if (res.status === 200) {
            //         this.allStudent = res.students;
            //         this.allStudentCount = res.count;
            //     }
            // })
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
                    this.dialogPassword = true;
                    break;
                case "edit":
                    this.dialogOperate = opt;
                    this.dialogVisible = true;
                    console.log(this.studentInfo);
                    break;
                case "delete":
                    if (row.group !== "") {
                        this.$alert(this.$t('student.groupNotNull'), this.$t("student.deleteTitle"), {
                            confirmButtonText: this.$t("student.deleteConfirm")
                        });
                        return;
                    }
                    console.log(row);
                    let studentInfo = {};
                    studentInfo.id = row._id;
                    studentService.removeStudent(studentInfo).then(res => {
                        if (res.status === 200) {
                            this.$message.success(res.message);
                            this.fetchStuidentList();
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                    break;
            }
        },
        fetchStuidentList() {
            this.studentQueryModel.school = this.commParam.school;
            this.getStudentList(this.studentQueryModel);
        },
        ...mapActions(["getGroupList", "getStudentList", "getStudentByClassId"])
    },
    computed: {
        commParam() {
            return { school: this.userinfo.school }
        },
        ...mapGetters({
            tableData: 'groupList',
            totalCount: 'groupCount',
            userinfo: "userinfo",
            allStudent: "allStudent",
            allStudentCount: "allStudentCount"
        })
    }
}
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>