<template>
    <section>
        <span>文章管理</span>
        <el-table>
            <el-table-column align="center"
                :label="$t('article.id')"
                width="80"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.title')"
                min-width="300px"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.level')"
                width="80">
            </el-table-column>
            <el-table-column align="center"
                :label="$t('article.lexile')"
                width="90">
            </el-table-column>
            <el-table-column align="center"
                :label="$t('article.status')"
                width="100"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.layout')"
                width="90"></el-table-column>
            <el-table-column align="center"
                :label="$t('article.operate')"
                width="120">
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
    },
    components: {
        "edu-table": table
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(["getArticleLevelList", "getArticleList"])
    },
    computed: {
        ...mapGetters({
            articleLevelList: "articleLevels"
        })
    }
}
</script>

<style>

</style>
