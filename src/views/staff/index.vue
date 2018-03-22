<template>
    <div>
        <h3>老师管理</h3>
        <!-- 过滤器 -->
        <div>
            <div class="filter-container">
                <el-input ref="tiSearch"
                    type="input"
                    :placeholder="$t('staff.searchName')"
                    class="filter-item"
                    style="width:200px"
                    clearable></el-input>
                <el-button type="primary"
                    icon="el-icon-search"
                    class="filter-item"
                    @click="btnSearchClickHandler">{{$t('staff.search')}}</el-button>
                <el-button type="primary"
                    icon="el-icon-edit"
                    class="filter-item"
                    style="margin-left: 10px;"
                    @click="operateHandler(null,'create')">{{$t('staff.add')}}</el-button>
            </div>
        </div>
        <!-- 表单 -->
        <edu-table :tableColumns="tableColumns"
            :tableData="staffList"
            :totalCount="totalCount"
            :pageSize="staffModel.pagesize"
            @pageChange="pageChange"
            ref="table">
            <template slot="opBtns"
                slot-scope="scope">
                <el-button size="mini"
                    @click="operateHandler(scope.row,'edit')">修改</el-button>
                <el-button size="mini"
                    @click="operateHandler(scope.row,'delete')">删除</el-button>
            </template>
        </edu-table>
        <!-- 弹框 -->
        <div></div>
        <detail-dialog :title="dialogTitle"
            :isShow="dialogVisible"
            @close="dialogVisible = false"></detail-dialog>
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
        pageChange() { },
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
                    break;
                case "delete":
                    staffService.deleteStaff(row).then(res => {
                        if (res.status == 200) {
                            this.$message({ type: "success", message: this.$t("staff.deleteStaffSuccess") });
                            this.getStaffList(this.userParam);
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
        console.log(this.userParam);
        this.getStaffList(this.userParam);
    },
    data() {
        return {
            tableColumns: [
                { prop: "name", label: this.$t('staff.username'), width: '190' },
                { prop: "school", label: this.$t('staff.school'), width: '90' },
                { prop: "phone", label: this.$t('staff.phone'), width: '140' },
                { prop: "mail", label: this.$t('staff.mail'), width: '140' },
                { prop: "group", label: this.$t('staff.group'), width: '140' },
                { prop: "createdAt", label: this.$t('staff.createdAt'), width: '230' },
                { prop: "updatedAt", label: this.$t('staff.updatedAt'), width: '140' },
                { label: this.$t('staff.operate'), slotName: 'opBtns', width: '170' }
            ],
            staffModel: {
                curr_page: 1,
                pagesize: 10,
                type: "page"
            },
            totalCount: 0,
            dialogTitle: "",
            dialogVisible: false
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
            staffList: "staffList"
        })
    }
}
</script>

<style>

</style>
