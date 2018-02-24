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
            <el-table :data="list" border style="width:100%" fit>
                <el-table-column align="center" :label="$t('group.name')" width="210" prop="master">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('group.school')" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.school}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('group.teacher')" width="90" prop="name">
                    <template slot-scope="scope">
                        <span>{{scope.row.staff.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('group.students')" width="60">
                    <template slot-scope="scope">
                        <span>444444444444444</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('group.createdAt')" width="120">
                    <template slot-scope="scope">
                        <span>6666666666666</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('group.updatedAt')" width="150">
                    <template slot-scope="scope">
                        <span>777777777777777</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('group.operate')" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="operateHandler(scope.row,'edit')">{{$t('group.edit')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'delete')">{{$t('group.delete')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'freeze')" v-if="scope.row.status==1">{{$t('group.freeze')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'unfreeze')" v-if="scope.row.status==0">{{$t('group.unfreeze')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 翻页 -->
        <div class="pagination-container">
            <el-pagination background @size-change="pageSizeChangeHandler" @current-change="pageCurrentChangeHandler" :current-page="1" :page-sizes="[5,10,20]" :page-size="10" :total="2" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 弹框 -->
        <div>
            <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
                <class-detail-panel :info="classInfo" v-on:closeDialog="dialogVisible=false"></class-detail-panel>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { fetchClass } from "@/api/group";
import ClassDetailPanel from "./detail";
export default {
    components: {
        ClassDetailPanel
    },
    data() {
        return {
            dialogVisible: false,
            dialogTitle: null,
            list: [],
            classInfo: {
                name: String,
                school: String,
                teacher: String,
                students: Array
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            fetchClass({}).then(res => {
                this.list = res.classInfos;
            })
        },
        btnSearchClickHandler() { },
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        operateHandler(row, opt) {
            this.classInfo = row;
            switch (opt) {
                case "create":
                    this.classInfo = {}
                    this.classInfo.name = "";
                    this.classInfo.teacher = "";
                    this.classInfo.students = "";
                    this.classInfo.school = "asdf";
                    this.dialogTitle = this.$t("group.add");
                    this.dialogVisible = true;
                    break;
            }
        }
    }
}
</script>

<style>

</style>
