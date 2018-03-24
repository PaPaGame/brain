<template>
    <div>
        <h3>{{$t('route.group')}}</h3>
        <!-- 过滤器 -->
        <div>
            <div class="filter-container">
                <el-input ref="tiSearch"
                    type="input"
                    :placeholder="$t('group.searchName')"
                    class="filter-item"
                    style="width:200px"
                    clearable></el-input>
                <el-button type="primary"
                    icon="el-icon-search"
                    class="filter-item"
                    @click="btnSearchClickHandler">{{$t('group.search')}}</el-button>
                <el-button type="primary"
                    icon="el-icon-edit"
                    class="filter-item"
                    style="margin-left: 10px;"
                    @click="operateHandler(null,'create')">{{$t('group.add')}}</el-button>
            </div>
        </div>
        <!-- 表单 -->
        <div>
            <el-table :data="groupList"
                border>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left"
                            inline>
                            <el-form-item label="Hello"></el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('group.name')"
                    width="210"
                    prop="name">
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('group.school')"
                    width="150"
                    prop="school">
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('group.staff')"
                    width="90"
                    prop="staff.name">
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('group.studentCount')"
                    width="60"
                    prop="student.length">
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('group.createdAt')"
                    width="120"
                    prop="createdAt">
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('group.updatedAt')"
                    width="150"
                    prop="updatedAt">
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('group.operate')"
                    min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini"
                            @click="operateHandler(scope.row,'edit')">{{$t('group.edit')}}</el-button>
                        <el-button size="mini"
                            @click="operateHandler(scope.row,'delete')">{{$t('group.delete')}}</el-button>
                        <el-button size="mini"
                            @click="operateHandler(scope.row,'freeze')"
                            v-if="scope.row.status==1">{{$t('group.freeze')}}</el-button>
                        <el-button size="mini"
                            @click="operateHandler(scope.row,'unfreeze')"
                            v-if="scope.row.status==0">{{$t('group.unfreeze')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 翻页 -->
        <div class="pagination-container">
            <el-pagination background
                @size-change="pageSizeChangeHandler"
                @current-change="pageCurrentChangeHandler"
                :current-page="1"
                :page-sizes="[5,10,20]"
                :page-size="10"
                :total="2"
                layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 弹框 -->
        <div>
            <el-dialog :visible.sync="dialogVisible"
                :title="dialogTitle">
                <class-detail-panel :info="classInfo"
                    v-on:closeDialog="dialogVisible=false"
                    :operate="dialogOperate"
                    v-on:fetchClassInfo="getList()"></class-detail-panel>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import groupService from "@/api/group";
import ClassDetailPanel from "./detail";
import table from "@/components/table";
import { mapActions, mapGetters } from "vuex";

export default {
    components: {
        ClassDetailPanel,
        "edu-table": table
    },
    data() {
        return {
            dialogVisible: false,
            dialogTitle: null,
            dialogOperate: "",
            tableColumns: [
                { prop: "name", label: this.$t("student.username"), width: "190" },
                { prop: "school", label: this.$t("student.school"), width: "90" },
                { prop: "phone", label: this.$t("student.phone"), width: "140" },
                { prop: "mail", label: this.$t("student.mail"), width: "140" },
                { prop: "group", label: this.$t("student.groupCount"), width: "140" },
                {
                    prop: "createdAt",
                    label: this.$t("student.createdAt"),
                    width: "230"
                },
                {
                    prop: "updatedAt",
                    label: this.$t("student.updatedAt"),
                    width: "140"
                },
                { label: this.$t("student.operate"), slotName: "opBtns", width: "170" }
            ],
            list: [],
            classInfo: {
                name: String,
                school: String,
                staff: Object,
                students: Array
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.getGroupList(this.commParams);
        },
        btnSearchClickHandler() { },
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        operateHandler(row, opt) {
            this.classInfo = row;
            switch (opt) {
                case "create":
                    this.classInfo = {};
                    this.classInfo.name = "";
                    this.classInfo.staff = { id: "", name: "" };
                    this.classInfo.students = "";
                    this.classInfo.school = this.userinfo.school;
                    this.dialogTitle = this.$t("group.add");
                    this.dialogVisible = true;
                    this.dialogOperate = opt;
                    break;
                case "edit":
                    this.dialogTitle = this.$t("group.edit");
                    this.dialogVisible = true;
                    this.dialogOperate = opt;
                    break;
                case "delete":
                    this.$confirm(this.$t("group.deleteMsg"), this.$t("group.delete"), {
                        confirmButtonText: this.$t("group.confirm"),
                        cancelButtonText: this.$t("group.cancel"),
                        type: "warning"
                    })
                        .then(() => {
                            groupService.deleteClass(row).then(res => {
                                this.$message({
                                    type: "success",
                                    message: this.$t("group.deleteSuccess")
                                });
                                this.getList();
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: this.$t("group.deleteCancel")
                            });
                        });
                    break;
            }
        },
        ...mapActions(["getGroupList"])
    },
    computed: {
        commParams() {
            return { school: this.userinfo.school }
        },
        ...mapGetters({
            userinfo: "userinfo",
            groupList: "groupList"
        })
    }
};
</script>

<style>

</style>
