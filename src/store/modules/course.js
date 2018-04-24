import loader from "@/utils/loader";
import * as types from "../mutation-type";
import async from "async";
var ArticleAnalyze = require("@/views/reading/util/articleAnalyze");
const state = {
    dirName: "",
    tais: [],
    quizs: [],
    title: "",
    pages: [],
    question: {},
    quiz: {}
}

const getters = {
    dirName: state => state.dirName,
    tais: state => state.tais,
    quizs: state => state.quizs,
    title: state => state.title,
    pages: state => state.pages,
    question: state => state.question,
    quiz: state => state.quiz
}

const mutations = {
    [types.COURSE_UPDATE_INFO](state, { data }) {
        state.dirName = data.dirName;
        state.title = data.title;
        state.tais = data.tais;
        state.quizs = data.quizs;
        state.pages = data.pages;
    },
    [types.COURSE_UPDATE_QUESTION](state, { data }) {
        state.question = data;
    },
    [types.COURSE_UPDATE_QUIZ](state, { data }) {
        state.quiz = data;
    }
}

const actions = {
    getPageInfo({ commit, state }, payload) {

    },

    getArticleInfo({ commit, state }, payload) {
        return new Promise((resolve, reject) => {


            let folder = payload;
            let fileName = folder + ".json";
            var analyze = new ArticleAnalyze();
            var obj = {};
            async.series({
                one: callback => {
                    loader({
                        url: `/${folder}/${fileName}`
                    }).then(res => {
                        this.articleInfos = Object.assign(obj, analyze.startBasicInfo(res));
                        callback(null, this.articleInfos);
                    });
                },
                two: callback => {
                    let quizName = "quizzes.json";
                    loader({
                        url: `/${folder}/${quizName}`
                    }).then(res => {
                        let obj2 = analyze.startQuizs(res);
                        obj.quizs = obj2;
                        this.articleInfos = obj;
                        callback(null, this.articleInfos);
                    });
                }
            }, (err, result) => {
                this.articleInfos.dirName = folder;
                console.log("final", this.articleInfos);
                commit(types.COURSE_UPDATE_INFO, { data: this.articleInfos });
                resolve();
            });
        })
    },

    getTaiInfo({ commit, state }, payload) {
        console.log(payload.dirName, payload.taiId);
        let { dirName, taiId } = payload;
        loader({
            url: `/${dirName}/question/${taiId}.json`
        }).then(res => {
            commit(types.COURSE_UPDATE_QUESTION, { data: res });
        });
    },

    getQuizInfo({ commit, state }, payload) {
        let { dirName, quizId } = payload;
        loader({
            url: `/${dirName}/question/${quizId}.json`
        }).then(res => {
            commit(types.COURSE_UPDATE_QUIZ, { data: res });
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}