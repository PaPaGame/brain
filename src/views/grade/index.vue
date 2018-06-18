<template>
    <section>
        <h1>评分页面</h1>
        <el-row :gutter="8">
            <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}">
                <class-list @classSelected="classListClick"></class-list>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 16}" :xl="{span: 10}">
                <edu-table :tableColumns="tableColumns" :tableData="allStudent" :totalCount="allStudentCount" :pageSize="studentQueryModel.pageSize" @pageChange="pageChange" ref="table">

                </edu-table>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import table from "@/components/table";
import studentService from "@/api/student";
import { mapActions, mapGetters } from "vuex";
import ClassList from "@/components/ClassList";
export default {
    components: {
        "class-list": ClassList,
        "edu-table": table
    },
    mounted() {
        // this.fetchStuidentList();
        this.fetchStudentData();
    },
    data() {
        return {
            studentQueryModel: {
                currentPage: 1,
                pageSize: 10,
            },
            tableColumns: [
                { prop: "username", label: this.$t('grade.username'), width: '140' },
                { prop: "tai", label: this.$t('grade.tai'), width: '90' },
                { prop: "quiz", label: this.$t('grade.quiz'), width: '90' },
                { prop: "record", label: this.$t('grade.record'), width: '250' },
                { label: this.$t("grade.operate"), slotName: 'opBtns' }
            ],
            showPage: true
        };
    },
    methods: {
        pageChange(e) {
            this.studentQueryModel.currentPage = e;
            this.fetchStudentData();
        },
        classListClick(id) {
            let query = {};
            query.id = id;
            this.getStudentByClassId(query);
        },
        fetchStudentData() {
            this.studentQueryModel.school = this.commParam.school;
            studentService.getStudentCourseData(this.studentQueryModel);
        },
        ...mapActions(["getGroupList", "getStudentByClassId"])
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
@import url("./grade.scss");
</style>
