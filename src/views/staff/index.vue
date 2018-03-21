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
                    @click="operateHandler(scope.row,'view')">查看</el-button>
                <el-button size="mini"
                    @click="operateHandler(scope.row,'edit')">修改</el-button>
                <el-button size="mini"
                    @click="operateHandler(scope.row,'delete')">删除</el-button>
            </template>
        </edu-table>
        <!-- 弹框 -->
        <div></div>

    </div>
</template>

<script>
import table from "@/components/table";
import { mapActions, mapGetters } from "vuex";

export default {
    components: {
        "edu-table": table
    },
    methods: {
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        pageChange() { },
        btnSearchClickHandler() { },
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
                { label: "操作", slotName: 'opBtns', width: '170' }
            ],
            staffModel: {
                curr_page: 1,
                pagesize: 10,
                type: "page"
            },
            totalCount: 0,
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
