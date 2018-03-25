import * as types from "../mutation-type";
import articleService from "@/api/article";

const state = {
    articleLevelList: new Array()
}
const getters = {
    articleLevels: state => state.articleLevelList
}
const mutations = {
    [types.ARTICLE_LEVEL_LIST](state, { data }) {
        state.articleLevelList = data.sort();
    }
}
const actions = {
    getArticleLevelList({ commit, state }, payload) {
        articleService.fetchArticleLevelList().then(res => {
            if (res.status == 200) {
                commit(types.ARTICLE_LEVEL_LIST, { data: res.list });
            } else {
                this.$message.error(this.$t('article.getLevelFailed'));
            }
        })
    },
    getArticleList({ commit, state }, payload) {
        // articleService
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}