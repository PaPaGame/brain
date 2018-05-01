<template>
    <div>
        <h3>校区管理</h3>
        <!-- filter 容器 -->
        <div class="filter-container">
            <el-input ref="tiSearch" type="input" :placeholder="$t('school.searchName')" class="filter-item" style="width:200px" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="btnSearchClickHandler">{{$t('school.search')}}</el-button>
            <el-button type="primary" icon="el-icon-edit" class="filter-item" style="margin-left: 10px;" @click="operateHandler(null,'create')">{{$t('school.add')}}</el-button>
        </div>

        <!-- 表单 -->
        <div>
            <el-table :data="list" border style="width:100%" fit>
                <el-table-column align="center" :label="$t('school.code')" width="90" prop="master">
                    <template slot-scope="scope">
                        <span>{{scope.row.code}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.name')" width="90" prop="name">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.status')" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.master')" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.master[0].name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.phone')" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.master[0].phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.createdTime')" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.createdAt}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.updatedTime')" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.updatedAt}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.operate')" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="operateHandler(scope.row,'edit')">{{$t('school.edit')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'delete')">{{$t('school.delete')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'freeze')" v-if="scope.row.status==1">{{$t('school.freeze')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'unfreeze')" v-if="scope.row.status==0">{{$t('school.unfreeze')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- page -->
        <div class="pagination-container">
            <el-pagination background @size-change="pageSizeChangeHandler" @current-change="pageCurrentChangeHandler" :current-page="1" :page-sizes="[5,10,20]" :page-size="10" :total="2" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <!-- 弹框 -->
        <div>
            <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
                <detail-panel :info="schoolInfo" v-on:closeDialog="dialogVisible=false" :currentMode="dialogMode"></detail-panel>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import schoolService from "@/api/school";
import DetailPanel from "./detail";
export default {
    components: {
        DetailPanel
    },
    data() {
        return {
            list: null,
            dialogVisible: false,
            dialogTitle: null,
            dialogMode: "",
            schoolInfo: {
                code: null,
                status: 0,
                master: String,
                phone: String,
                createAt: String
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            schoolService.fetchData({}).then(res => {
                this.list = res.schools;
            })
        },
        btnSearchClickHandler() {
            console.log(this.$refs.tiSearch);
        },
        btnAddClickHandler() { },
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        operateHandler(row, op) {
            console.log(row, op);
            this.schoolInfo = row;
            this.dialogMode = op;
            switch (op) {
                case "edit":
                    this.dialogVisible = true;
                    this.dialogTitle = this.$t('school.edit');
                    break;
                case "delete":
                    console.log(row._id);
                    let deleteQuery = { id: row._id };
                    schoolService.deleteData(deleteQuery).then(res => {
                        // 删除成功后重新获取一下列表
                        this.getList();
                    });
                    break;
                case "freeze":
                    break;
                case "unfreeze":
                    break;
                case "create":
                    this.schoolInfo = {};
                    this.schoolInfo.name = "";
                    this.schoolInfo.code = "";
                    this.schoolInfo.status = 0;
                    this.schoolInfo.master = "";
                    this.schoolInfo.phone = "";
                    this.dialogVisible = true;
                    this.dialogTitle = this.$t("school.add");
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style>

</style>
