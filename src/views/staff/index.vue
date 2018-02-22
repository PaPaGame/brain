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
        <div>
            <el-table :data="list" border style="width:100%" fit>
                <el-table-column align="center" :label="$t('staff.username')" width="90" prop="master">
                    <template slot-scope="scope">
                        <span>{{scope.row.code}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('staff.school')" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.updatedAt}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('staff.status')" width="90" prop="name">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('staff.phone')" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('staff.mail')" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.master}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('staff.createdAt')" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('staff.lastLoginAt')" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.createdAt}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('staff.operate')" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="operateHandler(scope.row,'edit')">{{$t('staff.edit')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'delete')">{{$t('staff.delete')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'freeze')" v-if="scope.row.status==1">{{$t('staff.freeze')}}</el-button>
                        <el-button size="mini" @click="operateHandler(scope.row,'unfreeze')" v-if="scope.row.status==0">{{$t('staff.unfreeze')}}</el-button>
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
        <div></div>
    </div>
</template>

<script>
export default {
    methods: {
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { }
    }
}
</script>

<style>

</style>
