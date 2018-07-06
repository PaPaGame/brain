<template>
    <div>
        <el-form :model="queryModel" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('group.name')">
                <el-input v-model="queryModel.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.school')">
                <el-input v-model="queryModel.school" :disabled="!canEditSchool"></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.staff')">
                <!-- <el-input ref="tiTeacherName" v-model="info.staff && info.staff.name || ''" clearable @keyup.enter.native="searchStaffByName"></el-input> -->
                <el-autocomplete :value="queryModel.staff && queryModel.staff.name" :placeholder="$t('group.fuzzyStaffList')" :fetch-suggestions="querySearchStaffAsync" @select="staffSelectHandler" style="width: 100%;"></el-autocomplete>
                <span v-if="findTeacherNothing">{{$t("group.noResult")}}</span>
            </el-form-item>
            <el-form-item :label="$t('group.students')">
                <!-- <el-input ref="tiStudentName" v-model="queryModel.students" clearable @keyup.enter.native="searchStudentByName"></el-input> -->
                <el-autocomplete :placeholder="$t('group.fuzzyStudentList')" :fetch-suggestions="querySearchStudentAsync" @select="studentSelectHandler" style="width: 100%;"></el-autocomplete>
                <span v-if="findStudentNothing">{{$t("group.noResult")}}</span>
                <div v-if="students.length">
                    <el-checkbox-group @change="checkgroupChange" v-model="checkedList">
                        <el-checkbox v-for="(student, index) in students" :key="student.id" :label="student.name" checked></el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-form-item>
            <el-form-item :label="$t('group.authorLabel')">
                <el-button @click="openInnerDialog">{{$t('group.author')}}</el-button>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="btnUpdateHandler" type="primary" v-if="operate === 'edit'">{{$t("group.update")}}</el-button>
            <el-button @click="btnCreateHandler" type="primary" v-if="operate === 'create'">{{$t("group.add")}}</el-button>
            <el-button @click="close">{{$t("group.cancel")}}</el-button>
        </div>
    </div>
</template>

<script>
// import { createClass, updateClass } from "@/api/group";
import groupService from "@/api/group";
import studentService from "@/api/student";
// import { FetchTeacherByFuzzyName } from "@/api/staff";
import staffService from "@/api/staff";
import { deepClone } from "@/utils/index";
import { mapGetters } from 'vuex';
export default {
    name: "ClassDetailPanel",
    props: {
        classInfo: {
            type: Object,
            default: null
        },
        operate: {
            type: String,
            default: ""
        },
        selectedLevel: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            findStudentNothing: false,
            findTeacherNothing: false,
            queryModel: {
                id: "",
                name: "",
                staff: { id: "", name: "" },
                school: "",
                student: [],
                articleLevel: []
            },
            staffs: [],
            rules: {
                code: [{ required: true, message: this.$t("group.requiredCode1"), trigger: 'change' }]
            },
            students: [],
            checkedList: []
        }
    },
    methods: {
        btnUpdateHandler() {
            //每次保存之前遍历一下列表，找到所有学生，再存
            let queryResult = [];

            if (this.checkedList.length > 0) {
                this.checkedList.forEach(checkItem => {
                    for (let i = 0; i < this.students.length; i++) {
                        const student = this.students[i];
                        if (checkItem === student.name) {
                            queryResult.push({ id: student.id, name: student.name });
                            break;
                        }
                    }
                });
            }
            this.queryModel.student = queryResult;
            this.queryModel.articleLevel = this.selectedLevel;
            groupService.updateClass(this.queryModel).then(res => {
                if (res.status = 200) {
                    this.$message.success(this.$t('group.updateSuccess'));
                } else {
                    this.$message.failed(this.$t('group.updateFailed'));
                }
                this.close();
                this.$emit("fetchClassInfo");
            });
        },
        btnCreateHandler() {
            groupService.createClass(this.queryModel).then(res => {
                this.$emit("fetchClassInfo");
                this.close();
            });
        },
        close() {
            this.checkedList = [];
            this.students = [];
            this.$emit("closeDialog");
        },
        searchStudentByName() {
            let name = this.$refs.tiStudentName.value
            studentService.fetchStudentByFuzzyName(name).then(res => {
                // 如果没有找到人 显示，否则呈现列表插入
                let result = res.infos;
                this.findStudentNothing = result.length === 0;
            });
        },
        async querySearchStaffAsync(queryStr, callback) {
            if (queryStr === "") {
                callback([]);
                return;
            }

            try {
                let query = { "name": queryStr };
                let staffInfos = await staffService.fetchTeacherByFuzzyName(query);
                let staffList = staffInfos.staff;
                if (staffList instanceof Array) {
                    staffList.map(staff => {
                        staff.value = staff.name;
                        return staff;
                    })
                };
                this.findTeacherNothing = staffList.length === 0;
                callback(staffList);
            } catch (e) {

            }
        },
        staffSelectHandler(e) {
            this.queryModel.staff = e;
        },
        async querySearchStudentAsync(queryStr, callback) {
            if (!queryStr) {
                callback([]);
                return;
            }

            try {
                let query = { "name": queryStr, "school": this.userinfo.school };
                let studentInfos = await studentService.fetchStudentByFuzzyName(query);
                let studentList = studentInfos.infos;
                if (studentList instanceof Array) {
                    studentList.map(student => {
                        student.value = student.username;
                        return student;
                    })
                }
                this.findStudentNothing = studentList.length === 0;
                callback(studentList);
            } catch (e) {

            }
        },
        studentSelectHandler(e) {
            // 如果学生有班级，则不能添加
            if (e.group !== "") {
                this.$alert(this.$t("group.alreadyHasGroup"), this.$t("group.alertTitle"), {
                    confirmButtonText: this.$t("group.alertConfirmButtonText")
                })
                return;
            }

            let student = {};
            student.id = e._id;
            student.name = e.username;
            this.students.push(student);
        },
        checkgroupChange(v) {
            // console.log(v, this.checkedList, this.students);

            // let uncheckedList = this.students.filter(s => this.checkedList.indexOf(s.name) < 0);
            // console.log(this.checkedList, uncheckedList);

        },
        openInnerDialog() {
            this.$emit('openInnerDialog');
        }
    },
    computed: {
        canEditSchool() {

            // 如果是管理员，可以随便填写，否则只能是自己的学校。不可添加其他学校
            this.queryModel.school = this.userinfo.role === "1000" ? "" : this.userinfo.school;
            return this.userinfo.role === "1000";
        },
        ...mapGetters({
            userinfo: "userinfo",
            articleLevelList: "articleLevels",
        })
    },
    watch: {
        classInfo(val) {
            debugger;
            this.queryModel.id = val._id;
            this.queryModel.name = val.name;
            this.queryModel.student = val.student;
            this.queryModel.staff = val.staff;
            this.queryModel.school = val.school;
            // this.students = val.student;
            this.students = [];
            val.student.forEach(stu => {
                this.students.push(stu);
            });

            console.log(this.students);
        }
    }
}
</script>

<style>
</style>
