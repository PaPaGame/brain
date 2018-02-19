<template>
    <div>
        <h3>校区管理</h3>
        <!-- filter 容器 -->
        <div>
            <el-input :placeholder="$t('school.searchName')" style="width:200px" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" @click="btnSearchClickHandler">{{$t('school.search')}}</el-button>
            <el-button type="primary" icon="el-icon-edit" style="margin-left: 10px;" @click="btnAddClickHandler">{{$t('school.add')}}</el-button>
        </div>

        <!-- 表单 -->
        <div>
            <el-table>
                <el-table-column align="center" :label="$t(school.code)" width="65">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column align="center" :label="$t(school.status)" width="150">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column align="center" :label="$t(school.master)" width="150">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column align="center" :label="$t(school.phone)" width="150">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column align="center" :label="$t(school.createTime)" width="150">
                    <template slot-scope="scope"></template>
                </el-table-column>
                <el-table-column align="center" :label="$t(school.operate)" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini">{{$t('school.modify')}}</el-button>
                        <el-button size="mini">{{$t('school.delete')}}</el-button>
                        <el-button size="mini">{{$t('school.freeze')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- page -->
        <div>
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
    created() {
        this.getList();
    },
    methods: {
        getList() {
            fetchData({}).then(res => {
                console.log(res);
            })
        },
        btnSearchClickHandler() { },
        btnAddClickHandler() { },
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { }
    }
}
</script>

<style>

</style>
