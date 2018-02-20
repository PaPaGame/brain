<template>
    <div>
        <h3>校区管理</h3>
        <!-- filter 容器 -->
        <div class="filter-container">
            <el-input :placeholder="$t('school.searchName')" class="filter-item" style="width:200px" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="btnSearchClickHandler">{{$t('school.search')}}</el-button>
            <el-button type="primary" icon="el-icon-edit" class="filter-item" style="margin-left: 10px;" @click="btnAddClickHandler">{{$t('school.add')}}</el-button>
        </div>

        <!-- 表单 -->
        <div>
            <el-table :data="list" border style="width:100%" fit>
                <el-table-column align="center" :label="$t('school.code')" width="90" prop="master">
                    <template slot-scope="scope">
                        <span>{{scope.row.code}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.status')" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.master')" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.master}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.phone')" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.createTime')" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('school.operate')" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="operateHandler(scope.row,'update')">{{$t('school.modify')}}</el-button>
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
        <div></div>
    </div>
</template>

<script>
import { fetchData } from "@/api/school";
export default {
    data() {
        return {
            list: null
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            console.log("获取学校列表");
            fetchData({}).then(res => {
                this.list = res.schools;
                console.log(this.list);
            })
        },
        btnSearchClickHandler() { },
        btnAddClickHandler() { },
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { },
        operateHandler(row, op) {
            alert(row + op)
        }
    }
}
</script>

<style>

</style>
