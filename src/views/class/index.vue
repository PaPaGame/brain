<template>
    <div>
        <h3>{{$t('route.group')}}</h3>
        <!-- 过滤器 -->
        <div>
            <div class="filter-container">
                <el-input ref="tiSearch" type="input" :placeholder="$t('group.searchName')" class="filter-item" style="width:200px" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" class="filter-item" @click="btnSearchClickHandler">{{$t('group.search')}}</el-button>
                <el-button type="primary" icon="el-icon-edit" class="filter-item" style="margin-left: 10px;" @click="operateHandler(null,'create')">{{$t('group.add')}}</el-button>
            </div>
        </div>
        <!-- 表单 -->
        <div>
            <el-table :data="groupList" border>
                <el-table-column align="center" :label="$t('group.name')" min-width="150" prop="name">
                </el-table-column>
                <el-table-column align="center" :label="$t('group.school')" min-width="150" prop="school">
                </el-table-column>
                <el-table-column align="center" :label="$t('group.staff')" min-width="90" prop="staff.name">
                </el-table-column>
                <el-table-column align="center" :label="$t('group.studentCount')" min-width="60">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top" v-if="scope.row.student && scope.row.student.length">
                            <span>姓名: </span>
                            <ul v-for="(role,index) in scope.row.student">
                                <li>
                                    <p>{{ role.name }}</p>
                                </li>
                            </ul>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.student.length }}</el-tag>
                            </div>
                        </el-popover>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('group.createdAt')" min-width="120" prop="createdAt">
                </el-table-column>
                <el-table-column align="center" :label="$t('group.updatedAt')" min-width="150" prop="updatedAt">
                </el-table-column>
                <el-table-column align="center" :label="$t('group.operate')" min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="operateHandler(scope.row,'edit')">{{$t('group.edit')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'delete')">{{$t('group.delete')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'viewData')">{{$t('group.viewData')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'freeze')" v-if="scope.row.status==1">{{$t('group.freeze')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'unfreeze')" v-if="scope.row.status==0">{{$t('group.unfreeze')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 翻页 -->
        <!-- <div class="pagination-container"> -->
        <el-pagination background @size-change="pageSizeChangeHandler" @current-change="pageCurrentChangeHandler" :current-page="1" :page-sizes="[5,10,20]" :page-size="10" :total="2" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- </div> -->
        <!-- 弹框 -->
        <div>
            <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
                <class-detail-panel :classInfo="classInfo" @closeDialog="close" :operate="dialogOperate" :selectedLevel="rightSelectedList" @fetchClassInfo="getList()" @openInnerDialog="innerVisible = true"></class-detail-panel>
                <el-dialog width="40%" :title="$t('group.authorLabel')" :visible.sync="innerVisible" append-to-body>
                    <span>{{articleSelectedList}}</span>
                    <el-transfer :button-texts="[$t('group.remove'), $t('group.add')]" :titles="[$t('group.source'), $t('group.target')]" v-model="articleSelectedList" :data="transferSource" @change="transferChangeHandler" @right-check-change="rightCheckChangeHandler"></el-transfer>
                    <span slot="footer">
                        <el-button @click="innerVisible = false">{{$t('group.cancel')}}</el-button>
                        <el-button type="primary" @click="innerVisible = false">{{$t('group.confirm')}}</el-button>
                    </span>
                </el-dialog>
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
                id: "",
                name: "",
                school: "",
                staff: {},
                student: [],
                articleLevel: []
            },
            innerVisible: false,
            // 右侧列表所有选项，包括未选中的
            articleSelectedList: [],
            // 右侧列表所有选中的
            rightSelectedList: []
        };
    },
    created() {
        this.getList();
        if (this.articleLevelList.length === 0) {
            this.getArticleLevelList().then(res => {
                this.transferSource;
            });
        } else {
            this.transferSource;
        }
    },
    methods: {
        close() {
            this.dialogVisible = false;
        },
        getList() {
            this.getGroupList(this.commParams);
        },
        btnSearchClickHandler() { },
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        transferChangeHandler(value, direction, movedKeys) {
            console.log(this.transferSource);
            console.log(value, direction, movedKeys);
        },
        rightCheckChangeHandler(selVal) {
            // [1.2, 1.1]
            this.rightSelectedList = selVal;
        },
        operateHandler(row, opt) {
            this.classInfo = row;
            switch (opt) {
                case "create":
                    this.classInfo = {};
                    this.classInfo.name = "";
                    this.classInfo.staff = { id: "", name: "" };
                    this.classInfo.student = [];
                    this.classInfo.school = this.userinfo.school;
                    this.classInfo.articleLevel = [];
                    this.dialogTitle = this.$t("group.add");
                    this.dialogVisible = true;
                    this.dialogOperate = opt;
                    break;
                case "edit":
                    this.dialogTitle = this.$t("group.edit");
                    this.dialogVisible = true;
                    this.dialogOperate = opt;

                    this.articleSelectedList = [];
                    // this.classInfo.articleLevel.forEach(level => {
                    //     this.articleSelectedList.push(this.articleLevelList.indexOf(level));
                    // })
                    break;
                case "delete":
                    this.$confirm(this.$t("group.deleteMsg"), this.$t("group.delete"), {
                        confirmButtonText: this.$t("group.confirm"),
                        cancelButtonText: this.$t("group.cancel"),
                        type: "warning"
                    }).then(() => {
                        let query = { id: row._id };
                        groupService.deleteClass(query).then(res => {
                            this.$message({
                                type: "success",
                                message: this.$t("group.deleteSuccess")
                            });
                            this.getList();
                        });
                    }).catch(() => {
                        this.$message({
                            type: "info",
                            message: this.$t("group.deleteCancel")
                        });
                    });
                    break;
                case "viewData":
                    break;
            }
        },
        ...mapActions(["getGroupList", "getArticleLevelList"])
    },
    computed: {
        transferSource() {
            let source = [];
            this.articleLevelList.forEach((level, index) => {
                source.push({
                    key: level,
                    label: level.toString()
                });
            });
            return source;
        },
        commParams() {
            return { school: this.userinfo.school }
        },
        ...mapGetters({
            userinfo: "userinfo",
            groupList: "groupList",
            articleLevelList: "articleLevels",
        })
    }
};
</script>

<style>
</style>
