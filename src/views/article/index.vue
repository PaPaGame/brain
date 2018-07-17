<template>
    <section>
        <h3>文章管理</h3>
        <el-table :data="articles" border>
            <el-table-column align="center" :label="$t('article.id')" width="80" prop="id"></el-table-column>
            <el-table-column :label="$t('article.title')" min-width="300px" prop="fullTitle"></el-table-column>
            <el-table-column align="center" :label="$t('article.level')" width="100">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-select v-model="scope.row.level" @change="onLevelSelect(scope.row,$event)">
                            <el-option v-for="item in articleLevelList" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </template>
                    <!-- <template v-if="scope.row.edit">
                        <el-input size="small" v-model="scope.row.level"></el-input>
                    </template> -->
                    <span v-else>{{scope.row.level}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('article.lexile')" width="110">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.lexile" clearable></el-input>
                    </template>
                    <span v-else>{{scope.row.lexile}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('article.status')" width="100" prop="status"></el-table-column>
            <el-table-column align="center" :label="$t('article.layout')" width="90" prop="layoutType"></el-table-column>
            <el-table-column align="center" :label="$t('article.operate')" min-width="200px">
                <template slot-scope="scope">
                    <el-button v-show="!scope.row.edit" @click="edit(scope.row)" size="small">{{$t('article.edit')}}</el-button>
                    <span v-show="scope.row.edit">
                        <el-button type="primary" @click='confirmEdit(scope.row)' size="small" icon="el-icon-edit">{{$t('article.comfirm')}}</el-button>
                        <el-button @click='cancelEdit(scope.row)' size="small" icon="el-icon-edit">{{$t('article.cancel')}}</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="150" @current-change="pageChangeHandler">
        </el-pagination>

        <edu-table :tableColumns="tableColumns" :tableData="articles" ref="table" showPage="true">

        </edu-table>
    </section>
</template>

<script>
import table from "@/components/table";
import { mapActions, mapGetters } from 'vuex';
import articleService from "@/api/article";
export default {
    created() {
        if (this.articleLevelList.length === 0) {
            this.getArticleLevelList();
        }

        this.getArticleList(this.queryModel);
    },
    components: {
        "edu-table": table
    },
    data() {
        return {
            articleList: [],
            queryModel: {
                currentPage: 0,
                pageSize: 10
            },
            tableColumns: [
                { prop: "id", label: this.$t('article.id'), width: 80 },
                { prop: "fullTitle", label: this.$t('article.title'), width: 320 },
                { prop: "grade", label: this.$t('article.grade'), width: 80 },
                { prop: "order", label: this.$t('article.order'), width: 80 },
                { prop: "lexile", label: this.$t('article.lexile'), width: 110 },
                { prop: "layoutType", label: this.$t('article.layout'), width: 90 },
                { prop: "status", label: this.$t('article.status'), width: 100 }
            ]
        }
    },
    methods: {
        confirmEdit(row) {
            row.originLevel = row.level;
            row.originLexile = row.lexile;
            row.edit = false;
            console.log(row.level, row.lexile);
        },
        cancelEdit(row) {
            row.lexile = row.originLexile;
            row.level = row.originLevel;
            row.edit = false;
            this.$message({
                message: this.$t('article.cancelEditMessage') + row.id,
                type: 'warning'
            })
        },
        edit(row) {
            row.edit = true;
        },
        pageChangeHandler(p) {
            console.log("翻页啦" + p);
            this.queryModel.pageSize = 10;
            this.queryModel.currentPage = p - 1;
            this.getArticleList(this.queryModel);
        },
        getArticleList(query) {
            articleService.fetchArticleList(query).then(res => {
                if (res.status == 200) {
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
        ...mapActions(["getArticleLevelList"])//, "getArticleList"
    },
    computed: {
        articles() {
            this.articleList.map(article => {
                this.$set(article, 'edit', false);
                article.originLevel = article.level;
                article.originLexile = article.lexile;
                return article;
            });

            let list = [];
            this.articleList.forEach(article => {
                list.push(article);
            });

            return list;
        },
        ...mapGetters({
            articleLevelList: "articleLevels",
            // articleList: "articleList"
        })
    }
}
</script>

<style>
</style>
