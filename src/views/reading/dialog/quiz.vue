<template>
    <edu-dialog :isShow="dialogVisible" @close="close" :title="this.quizs.question" class="tai-dialog-panel">
        <el-radio-group v-model="radioLabel" @change="onRadioChange(radioLabel)">
                <el-radio v-for="(option,index) in quizs.answers" :key="index" :label="option.answer" class="radio-item"></el-radio>
        </el-radio-group>
        <div class="question_button">
            <el-button @click="submitAnswer" class="btn-submit"><i class="iconfont icon-laba"></i>{{$t('reading.commit')}}</el-button>
        </div>

        <audio ref="taiAudio" autoplay @ended="playend"></audio>
    </edu-dialog>
</template>

<script>
import eduDialog from "@/components/Dialog/dialog";
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        eduDialog
    },
    data() {
        return {
            dialogVisible: false,
            radioLabel: ""
        }
    },
    props: {
        isShow: { type: Boolean, default: false },
        questionId: { type: String, default: "" }
    },
    watch: {
        isShow() {
            this.dialogVisible = this.isShow;
        },
        questionId() {
            console.log(this.questionId)
            this.getQuizInfo({ dirName: this.dirName, quizId: this.questionId });
        }
    },
    methods: {
        close() {
            this.dialogVisible = false;
            this.$emit("close");
        },
        playSound(id) {
            this.$refs.taiAudio.src = `http://${process.env.PUBLIC_PATH}:9050/dist/${this.dirName}/audio/${id}`;
        },
        playend() {
            if (!this.findAnswer)
                return;

            if (this.findAnswer.correct == true) {
                setTimeout(() => {
                    this.close();
                }, 5000);
            }
        },
        submitAnswer() {
            // if (!this.findAnswer) {
            //     return;
            // }

            // let hits = this.findAnswer.hints;
            // let rndIdx = Math.floor(Math.random() * 2);
            // let hit = hits[rndIdx];
            // this.hits = hit.text;
            // this.playSound(hit.audio);
            // TODO: 发送数据
        },
        ...mapActions(["getQuizInfo"])
    },
    computed: {
        ...mapGetters({
            dirName: "dirName",
            quizs: "quizs",
            quiz: "quiz"
        })
    }

}
</script>

<style>

</style>
