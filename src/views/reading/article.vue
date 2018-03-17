<template>
    <section>
        <el-row class="title-wapper">
            <el-col :span="2"
                class="title">{{$t('reading.title')}}</el-col>
            <el-col :span="2"
                :offset="20"
                class="back"
                @click.native="goBack">
                <i class="el-icon-d-arrow-left"></i>{{$t("reading.back")}}</el-col>
        </el-row>
        <span>{{contentModel}}</span>
        <el-tabs tab-position="top"
            style="height: 200px;">
            <el-tab-pane :label="$t('reading.alphabet')">
                <step-preview></step-preview>
            </el-tab-pane>
            <el-tab-pane :label="$t('reading.reading')">
                <step-read></step-read>
            </el-tab-pane>
            <el-tab-pane :label="$t('reading.record')">
                <step-record></step-record>
            </el-tab-pane>
            <el-tab-pane :label="$t('reading.quiz')">
                <step-quiz></step-quiz>
            </el-tab-pane>
        </el-tabs>
        <page-content :title="articleInfos.title"
            :pages="articleInfos.pages"
            :tais="articleInfos.tais"
            :quizs="articleInfos.quizs"
            :dirName="this.contentModel.article[0].dirName">
        </page-content>
    </section>
</template>

<script>
import Steps from "./step";
import PageContent from "./pageContent";
import loader from "@/utils/loader";
var ArticleAnalyze = require("./util/articleAnalyze");
var myAsync = require("async");
export default {
    components: {
        "step-preview": Steps.Step1,
        "step-read": Steps.Step2,
        "step-record": Steps.Step3,
        "step-quiz": Steps.Step4,
        "page-content": PageContent
    },
    data() {
        return {
            contentModel: this.$route.params.info,
            articleInfos: {},
            analyze: new ArticleAnalyze()
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        loadRemoteJSON() {
            let aa = new ArticleAnalyze();
            let folder = this.contentModel.article[0].dirName;
            let fileName = folder + ".json";

            var obj = {};
            myAsync.series({
                one: callback => {
                    loader({
                        url: `/${folder}/${fileName}`
                    }).then(res => {
                        this.articleInfos = Object.assign(obj, this.analyze.startBasicInfo(res));
                        callback(null, this.articleInfos);
                    });
                },
                two: callback => {
                    let quizName = "quizzes.json";
                    loader({
                        url: `/${folder}/${quizName}`
                    }).then(res => {
                        let obj2 = this.analyze.startQuizs(res);
                        obj.quizs = obj2;
                        this.articleInfos = obj;
                        callback(null, this.articleInfos);
                    });
                }
            }, (err, result) => {
                console.log("final", this.articleInfos);
            });
        }
    },
    watch: {
        contentModel(val) {
            this.contentModel = val;
            if (!this.contentModel) {
                return;
            }

            this.loadRemoteJSON();

        },
        '$route'(to, from) {
            this.contentModel = this.$route.params.info;
        }
    },
    created() {
        if (this.contentModel) {
            this.loadRemoteJSON();
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: #393939;
  font-weight: 600;
}
.back {
  cursor: pointer;
  font-size: 14px;
}
</style>
