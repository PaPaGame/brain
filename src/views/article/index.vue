<template>
  <section>
    <h3>文章管理</h3>
    <edu-table :tableColumns="tableColumns" :tableData="articleList" ref="table" :showPage="showPage" :totalCount="150" :pageSize="queryModel.pagesize" @pageChange="pageChangeHandler">

    </edu-table>
  </section>
</template>

<script>
import table from '@/components/table';
import {mapActions, mapGetters} from 'vuex';
import articleService from '@/api/article';
export default {
  created() {
    if (this.articleLevelList.length === 0) {
      this.getArticleLevelList();
    }

    this.getArticleList(this.queryModel);
  },
  components: {
    'edu-table': table
  },
  data() {
    return {
      articleList: [],
      queryModel: {
        currentPage: 0,
        pageSize: 10
      },
      tableColumns: [
        {prop: 'id', label: this.$t('article.id'), width: 80},
        {prop: 'fullTitle', label: this.$t('article.title'), width: 380},
        {prop: 'grade', label: this.$t('article.grade'), width: 80},
        {prop: 'order', label: this.$t('article.order'), width: 80},
        {prop: 'lexile', label: this.$t('article.lexile'), width: 110},
        {prop: 'layoutType', label: this.$t('article.layout'), width: 90},
        {prop: 'status', label: this.$t('article.status'), width: 100}
      ],
      showPage: true
    };
  },
  methods: {
    pageChangeHandler(p) {
      console.log('翻页啦' + p);
      this.queryModel.pageSize = 10;
      this.queryModel.currentPage = p - 1;
      this.getArticleList(this.queryModel);
    },
    getArticleList(query) {
      articleService.fetchArticleList(query).then(res => {
        if (res.status === 200) {
          this.articleList = res.list;
        } else {
          this.$message.error(this.$t('article.getListFailed'));
        }
      });
    },
    onLevelSelect(row, e) {
      row.level = e;
      row.edit = true;
    },
    ...mapActions(['getArticleLevelList'])// , "getArticleList"
  },
  computed: {
    ...mapGetters({
      articleLevelList: 'articleLevels',
      // articleList: "articleList"
    })
  }
};
</script>

<style>
</style>
