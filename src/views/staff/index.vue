<template>
    <div>
        <h3>老师管理</h3>
        <!-- 过滤器 -->
        <div>
            <div class="filter-container">
                <el-input ref="tiSearch" type="input" :placeholder="$t('staff.searchName')" class="filter-item" style="width:200px" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" class="filter-item" @click="btnSearchClickHandler">{{$t('staff.search')}}</el-button>
                <el-button type="primary" icon="el-icon-edit" class="filter-item" style="margin-left: 10px;" @click="operateHandler(null,'create')">{{$t('staff.add')}}</el-button>
            </div>
        </div>
        <!-- 表单 -->
        <edu-table :tableColumns="tableColumns" :tableData="staffList" :totalCount="staffCount" :pageSize="queryModel.pagesize" @pageChange="pageChange" ref="table" :showPage="showPage">
            <template slot="opBtns" slot-scope="scope">
                <el-button size="mini" @click="operateHandler(scope.row,'edit')">修改</el-button>
                <el-button size="mini" @click="operateHandler(scope.row,'delete')">删除</el-button>
            </template>
        </edu-table>
        <!-- 弹框 -->
        <div></div>
        <detail-dialog :dialogTitle="dialogTitle" :isShow="dialogVisible" @close="dialogVisible = false" :staffInfo="staffInfo"></detail-dialog>
    </div>
</template>

<script>
import staffService from "@/api/staff";
import table from "@/components/table";
import { mapActions, mapGetters } from "vuex";
import DetailDialog from "./detail";
export default {
    components: {
        "edu-table": table,
        DetailDialog
    },
    methods: {
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        pageChange(e) {
            // console.log(e);
            this.queryModel.currentPage = e;
            this.getStaffList(this.queryModel);
        },
        btnSearchClickHandler() { },
        operateHandler(row, opt) {
            let role = {};
            role.school = "";
            switch (opt) {
                case "create":
                    this.dialogTitle = this.$t('staff.createTitle');
                    this.dialogVisible = true;
                    break;
                case "edit":
                    this.staffInfo = row;
                    this.dialogTitle = this.$t('staff.edit');
                    this.dialogVisible = true;
                    console.log("页面点击", this.staffInfo);
                    break;
                case "delete":
                    staffService.deleteStaff(row).then(res => {
                        if (res.status == 200) {
                            this.queryModel.school = this.userParam.school;
                            this.getStaffList(this.queryModel);
                            this.$message({ type: "success", message: this.$t("staff.deleteStaffSuccess") });
                        } else {
                            this.$message({ type: "error", message: this.$t("staff.deleteStaffFailed") });
                        }
                    })
                    break;
            }
        },
        ...mapActions(["getStaffList"])
    },
    created() {
        this.queryModel.school = this.userParam.school;
        this.getStaffList(this.queryModel);
    },
    data() {
        return {
            tableColumns: [
                { prop: "name", label: this.$t('staff.username'), width: '190' },
                { prop: "school", label: this.$t('staff.school'), width: '90' },
                { prop: "phone", label: this.$t('staff.phone'), width: '140' },
                { prop: "mail", label: this.$t('staff.mail'), width: '180' },
                {                    prop: "group", label: this.$t('staff.group'), width: '140',
                    template: (row) => {
                        return row.group.length + this.$t('staff.unit');
                    }                },
                { prop: "createdAt", label: this.$t('staff.createdAt'), width: '230' },
                { prop: "updatedAt", label: this.$t('staff.updatedAt'), width: '140' },
                { label: this.$t('staff.operate'), slotName: 'opBtns', width: '170' }
            ],
            showPage: true,
            queryModel: {
                currentPage: 1,
                pageSize: 10,
            },
            dialogTitle: "",
            dialogVisible: false,
            staffInfo: {}
        }
    },
    computed: {
        userParam() {
            return {
                school: this.userinfo.school
            };
        },
        ...mapGetters({
            userinfo: "userinfo",
            staffList: "staffList",
            staffCount: "staffCount"
        })
    }
}
</script>

<style>

</style>
