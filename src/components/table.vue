<template>
  <section>
    <el-table ref="eduTable" :data="tableData" @cell-click="cellClick" style="with:100%" class="edu-fix" border>
      <el-table-column v-for="(value, index) in tableColumns" :key="index" :prop="value.prop" :label="value.label" :width="value.width ? value.width :''" :className="value.className">
        <template slot-scope="scope">
          <div v-if="value.slotName">
            <slot :name="value.slotName" :row="scope.row" />
          </div>
          <div v-else v-html="value.template ? value.template(scope.row) : scope.row[value.prop]"></div>
        </template>
      </el-table-column>
    </el-table>
    <section class="page-container" v-if="showPage && totalCount>pageSize">
      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalCount" :current-page.sync="indexPage" @current-change="handleCurrentPageChange"></el-pagination>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    cellClick: {type: Function, default: function () { }},
    tableColumns: {type: Array, default: ()=>[]},
    tableData: Array,
    showPage: {type: Boolean, default: true},
    totalCount: Number,
    pageSize: {type: Number, default: 10}
  },
  data() {
    return {
      indexPage: 1
    };
  },
  methods: {
    initPage() {
      this.indexPage = 1;
    },
    handleCurrentPageChange(val) {
      this.$emit('pageChange', val);
    }
  }
};
</script>

<style>
</style>
