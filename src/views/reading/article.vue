<template>
    <section class='reading-section'>
        <el-row class="title-wapper">
            <el-col :span="10" class="title">{{$t('reading.title')}}</el-col>
            <el-col :span="2" :offset="12" style='float: right;'>
                <el-button type="warning" class="back" @click.native="goBack">
                    <i class="el-icon-d-arrow-left"></i>{{$t("reading.back")}}</el-button>
            </el-col>

            <!-- <el-col  class="back" @click.native="goBack"><i class="el-icon-d-arrow-left"></i>{{$t("reading.back")}}</el-col> -->
        </el-row>
        <!-- <span>{{contentModel}}</span> -->
        <el-tabs tab-position="top" class='reading-tab'>
            <!-- <el-tab-pane :label="$t('reading.alphabet')">
                <step-preview></step-preview>
            </el-tab-pane> -->
            <el-tab-pane :label="$t('reading.reading')">
                <step-read v-on:startReading="startReading" v-on:stopReading="stopReading" @taiprogress='taiprogress'></step-read>
            </el-tab-pane>
            <!-- <el-tab-pane :label="$t('reading.record')">
                <step-record></step-record>
            </el-tab-pane> -->
            <el-tab-pane :label="$t('reading.quiz')">
                <step-quiz></step-quiz>
            </el-tab-pane>
        </el-tabs>
        <page-content :currentSentenceIndex="sentenceIndex" ref="pageContent">
        </page-content>
        <audio autoplay ref="articleAudio"></audio>
    </section>

    <!-- :title="course.title"
            :pages="course.pages"
            :tais="course.tais"
            :quizs="course.quizs"
            :dirName="course.dirName" -->

</template>

<script>
import Steps from "./step";
import PageContent from "./pageContent";
import loader from "@/utils/loader";
import { mapGetters, mapActions } from "vuex";
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
            sentenceIndex: -1
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        loadRemoteJSON() {
            let f = this.contentModel.dirName;
            this.getArticleInfo(f).then(res => {
            });
        },
        startReading() {
            this.$refs.pageContent.start();
        },
        stopReading() {
            this.$refs.pageContent.stop();
        },
        taiprogress(idx) {
        },
        ...mapActions(["getArticleInfo"])

    },
    computed: mapGetters({
        title: "title",
        dirName: "dirName",
        quizs: "quizs",
        tais: "tais"
    }),
    watch: {
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

<style lang="scss">
@import "./article.scss";
</style>
