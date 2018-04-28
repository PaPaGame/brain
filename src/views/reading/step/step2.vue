<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc2")}}</span>
        </div>
        <!-- <el-progress :text-inside="true" :stroke-width="28" :percentage="70"></el-progress> -->
        <edu-progress :totalCount="pages.length" @test11='test11'>progressbar</edu-progress>
        <div class='btn-group'>
            <el-button type="primary"  @click="start">{{$t('reading.readtome')}}</el-button>
            <el-button type="warning" @click="pause">{{$t('reading.pause')}}</el-button>
            <span class='switch'>
                <el-switch v-model="switchVal"></el-switch> {{$t('reading.glossary')}}
            </span>
        </div>
    </div>
</template>

<script>
import eduProgress from "../dialog/progress";
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        eduProgress
    },
    props:{
    },
    data(){
        return {
            switchVal:false
        }
    },
    methods: {
        start() {
            this.$emit("startReading");
        },
        pause() {
            this.$emit("stopReading");
        }
    },
    computed: {
        ...mapGetters({
            dirName: "dirName",
            quizs: "quizs",
            quiz: "quiz",
            pages:'pages'

        })
    }
}
</script>

<style lang="scss">
@import "./step.scss";
</style>
