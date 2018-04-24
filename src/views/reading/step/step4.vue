<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc4")}}</span>
        </div>
        <el-progress :text-inside="true"
            :stroke-width="28"
            :percentage="70"></el-progress>
        <div class='btn-group'>
        <el-button @click="takeQuiz()">{{$t('reading.takequiz')}}</el-button>
        <el-button>{{$t('reading.takequizagain')}}</el-button>
        </div>
        <quiz-dialog :isShow="dialogVisible" @close="onClose" :questionId='quizId'></quiz-dialog>
    </div>
</template>

<script>
// import quizDialog from "@/components/Dialog/dialog";
import QuizDialog from "../dialog/quiz";
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        QuizDialog
        // quizDialog
    },
    props: {
        isShow: { type: Boolean, default: false }
    },
    data() {
        return {
            dialogVisible: false,
            quizId:''//this.quizs[0]
        }
    },
    methods: {
        takeQuiz(id) {
            this.dialogVisible = true;
            this.quizId = this.quizs[0];
        },
        onClose() {
            this.dialogVisible = false;
            // this.hits = "";
            this.$emit("close");
        },
        ...mapActions(["getQuizInfo"])
    },
    computed: {
        ...mapGetters({
            dirName: "dirName",
            quizs: "quizs",
            quiz: "quiz"
        })
    },
    watch: {
        isShow() {
            this.dialogVisible = this.isShow;
        }
    }
}
</script>

<style lang="scss">
@import "./step.scss";
</style>
