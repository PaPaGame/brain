import * as types from '../mutation-type';
import articleService from '@/api/article';

const state = {
  articleLevelList: [],
  articleList: []
};
const getters = {
  articleLevels: state => state.articleLevelList,
  articleList: state => state.articleList
};
const mutations = {
  [types.ARTICLE_LEVEL_LIST](state, {
    data
  }) {
    state.articleLevelList = data.sort();
  },
  [types.ARTICLE_LIST](state, {
    data
  }) {
    state.articleList = data;
  }
};
const actions = {
  getArticleLevelList({
    commit,
    state
  }, payload) {
    return new Promise((resolve, reject) => {
      articleService.fetchArticleLevelList().then(res => {
        if (res.status === 200) {
          commit(types.ARTICLE_LEVEL_LIST, {
            data: res.list
          });
        } else {
          this.$message.error(this.$t('article.getLevelFailed'));
        }
      });
    });
  },
  getArticleList({
    commit,
    state
  }, payload) {
    articleService.fetchArticleList(payload).then(res => {
      if (res.status === 200) {
        commit(types.ARTICLE_LIST, {
          data: res.list
        });
      } else {
        this.$message.error(this.$t('article.getListFailed'));
      }
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
