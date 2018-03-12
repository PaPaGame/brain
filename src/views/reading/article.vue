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
        <page-content>
        </page-content>
        <el-button @click="loadRemoteJSON">Load File</el-button>
    </section>
</template>

<script>
import Steps from "./step";
import PageContent from "./pageContent";
import loader from "@/utils/loader";
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
            contentModel: this.$route.params.info
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        loadRemoteJSON() {
        }
    },
    watch: {
        contentModel(val) {
            this.contentModel = val;
        },
        '$route'(to, from) {
            // console.log(this.$route.params);
            this.contentModel = this.$route.params.info;
        }
    },
    created() {
        loader({
            url: "http://localhost:9050/ACubsLife_4061_609.json"
        }).then(res => {
            console.log(res);
        });
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
