<template>
    <div class="main">
        <h3>学生管理</h3>
        <!-- 过滤器 -->
        <div>
            <div class="filter-container">
                <el-input ref="tiSearch"
                    type="input"
                    :placeholder="$t('student.searchName')"
                    class="filter-item"
                    style="width:200px"
                    clearable></el-input>
                <el-button type="primary"
                    icon="el-icon-search"
                    class="filter-item"
                    @click="btnSearchClickHandler">{{$t('student.search')}}</el-button>
                <el-button type="primary"
                    icon="el-icon-edit"
                    class="filter-item"
                    style="margin-left: 10px;"
                    @click="operateHandler(null,'create')">{{$t('student.add')}}</el-button>
            </div>
        </div>
        <div class="leftContainer">
            <class-list></class-list>
        </div>
        <div class="rightContainer">
            <el-table :data="studentList"
                border
                style="width:100%"
                fit>
                <el-table-column align="center"
                    :label="$t('student.secondName')"
                    width="90"
                    prop="master">
                    <template slot-scope="scope">
                        <span>{{scope.row.secondName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('student.firstName')"
                    width="60">
                    <template slot-scope="scope">
                        <span>{{scope.row.firstName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('student.school')"
                    width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.school}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"
                    :label="$t('student.group')"
                    width="270"
                    prop="name">
                    <template slot-scope="scope">
                        <span>{{scope.row.group}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 翻页 -->
            <div class="pagination-container">
                <el-pagination background
                    @size-change="pageSizeChangeHandler"
                    @current-change="pageCurrentChangeHandler"
                    :current-page="1"
                    :page-sizes="[5,10,20]"
                    :page-size="10"
                    :total="2"
                    layout="prev, pager, next">
                </el-pagination>
            </div>
        </div>
        <edu-table :tableColumns="tableColumns"
            :tableData="studentList"
            :totalCount="totalCount"
            :pageSize="studentModel.pagesize"
            @pageChange="pageChange"
            ref="table">
        </edu-table>
    </div>
</template>

<script>
import ClassList from "@/components/ClassList";
import { FetchStudents } from "@/api/student";
import table from "@/components/table";
export default {
    components: {
        ClassList,
        "edu-table": table
    },
    data() {
        return {
            studentList: [],
            studentModel: {
                subject: "",
                curr_page: 1,
                pagesize: 10,
                type: "page"
            },
            tableColumns: [
                { prop: "secondName", label: this.$t('student.secondName'), width: '90' },
                { prop: "firstName", label: this.$t('student.firstName'), width: '90' },
                { prop: "school", label: this.$t('student.school'), width: '90' },
                { prop: "group", label: this.$t('student.group'), width: '90' },
            ]
        };
    },
    methods: {
        pageSizeChangeHandler() { },
        pageCurrentChangeHandler() { }
    },
    beforeMount() {
        FetchStudents().then(res => {
            this.studentList = res.students;
            this.studentList = this.studentList.concat(this.studentList).concat(this.studentList).concat(this.studentList).concat(this.studentList).concat(this.studentList)
        })
    }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;
}
.leftContainer {
  width: 400px;
  float: left;
  height: auto;
}
.rightContainer {
  width: auto;
  float: right;
  height: auto;
}
</style>