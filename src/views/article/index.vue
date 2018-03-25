<template>
    <section>
        <span>文章管理</span>
        <el-table :data="articleList">
            <el-table-column align="center"
                :label="$t('article.id')"
                width="80"
                prop="id"></el-table-column>
            <el-table-column :label="$t('article.title')"
                min-width="300px"
                prop="fullTitle"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.level')"
                width="80"
                prop="level">
            </el-table-column>
            <el-table-column align="center"
                :label="$t('article.lexile')"
                width="90"
                prop="lexile">
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
                    <el-button v-if="scope.row.edit"
                        type="success"
                        @click="confirmEdit(scope.row)"
                        size="small"
                        icon="el-icon-circle-check-outline">Ok</el-button>
                    <span v-else>
                        <el-button type="primary"
                            @click='scope.row.edit=!scope.row.edit'
                            size="small"
                            icon="el-icon-edit">{{$t('article.comfirm')}}</el-button>
                        <el-button type="primary"
                            @click='scope.row.edit=!scope.row.edit'
                            size="small"
                            icon="el-icon-edit">{{$t('article.cancel')}}</el-button>
                    </span>
                </template>
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
        }
    },
    methods: {
        ...mapActions(["getArticleLevelList", "getArticleList"])
    },
    computed: {
        ...mapGetters({
            articleLevelList: "articleLevels",
            articleList: "articleList"
        })
    }
}
</script>

<style>

</style>
