<template>
    <section>
        <span>文章管理</span>
        <el-table :data="articles">
            <el-table-column align="center"
                :label="$t('article.id')"
                width="80"
                prop="id"></el-table-column>
            <el-table-column :label="$t('article.title')"
                min-width="300px"
                prop="fullTitle"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.level')"
                width="100">
                <template slot-scope="scope">
                    <!-- <template v-if="scope.row.edit">
                        <el-select v-model="scope.row.level"
                            @change="onLevelSelect(scope.row,$event)">
                            <el-option v-for="item in articleLevelList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template> -->
                    <template v-if="scope.row.edit">
                        <el-input size="small"
                            v-model="scope.row.level"></el-input>
                    </template>
                    <span v-else>{{scope.row.level}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                :label="$t('article.lexile')"
                width="110">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input clearable></el-input>
                    </template>
                    <span v-else>{{scope.row.lexile}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                :label="$t('article.status')"
                width="100"
                prop="status"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.layout')"
                width="90"
                prop="layoutType"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.operate')"
                min-width="200px">
                <template slot-scope="scope">
                    <el-button v-show="!scope.row.edit"
                        type="success"
                        @click="edit(scope.row)"
                        size="small"
                        icon="el-icon-circle-check-outline">{{$t('article.edit')}}</el-button>
                    <span v-show="scope.row.edit">
                        <el-button type="primary"
                            @click='confirmEdit(scope.row)'
                            size="small"
                            icon="el-icon-edit">{{$t('article.comfirm')}}</el-button>
                        <el-button @click='cancelEdit(scope.row)'
                            size="small"
                            icon="el-icon-edit">{{$t('article.cancel')}}</el-button>
                    </span>
                </template>
                <!-- <template slot-scope="scope">
                    <el-button v-if="scope.row.edit"
                        type="success"
                        @click="confirmEdit(scope.row)"
                        size="small"
                        icon="el-icon-circle-check-outline">Ok</el-button>
                    <el-button v-else
                        type="primary"
                        @click='scope.row.edit=!scope.row.edit'
                        size="small"
                        icon="el-icon-edit">Edit</el-button>
                </template> -->
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
import table from "@/components/table";
import { mapActions, mapGetters } from 'vuex';
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
            queryModel: {
                currentPage: 0,
                pageSize: 10
            }
            // list: [{ level: 1, edit: false }, { level: 2, edit: false }]
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
        ...mapActions(["getArticleLevelList", "getArticleList"])
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
            articleList: "articleList"
        })
    }
}
</script>

<style>

</style>
