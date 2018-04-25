<template>
    <edu-dialog :isShow="dialogVisible" @close="close" :title="this.quiz.question" class="tai-dialog-panel">
        <el-radio-group v-model="radioLabel" @change="onRadioChange(radioLabel)">
                <el-radio v-for="(option,index) in quiz.answers" :key="index" :label="option.answer" class="radio-item"></el-radio>
        </el-radio-group>
        <!-- <el-checkbox-group v-model="radioLabel" @change="onRadioChange(radioLabel)">
            <el-checkbox v-for="(option,index) in quiz.answers" :key="index" :label="option.answer" ></el-checkbox>
        </el-checkbox-group> -->
        <div class="question_button">
            <el-button @click="submitAnswer(idx)" class="btn-submit"><i class="iconfont icon-laba"></i>{{$t('reading.commit')}}</el-button>
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
            findAnswer: null,
            radioLabel: "",
            idx:''
        }
    },
    props: {
        isShow: { type: Boolean, default: false },
        questionId: { type: String, default: "" },
        questionArr: {type:Array, default:[]}
    },
    watch: {
        isShow() {
            this.dialogVisible = this.isShow;
        },
        questionId() {
            // console.log(this.quiz);
            // console.log(this.quizs);
            this.getQuizInfo({ dirName: this.dirName, quizId: this.questionId });
            this.idx = parseInt(this.questionId) + 1;
        },
        questionArr() {
            console.log(this.quizs);
        }
    },
    methods: {
        onRadioChange(lbl) {
            let ans = this.quiz.answers;
            for (let i = 0; i < ans.length; i++) {
                let answer = ans[i];
                if (answer.answer == lbl) {
                    this.findAnswer = answer;
                    break;
                }
            }

            if (!this.findAnswer)
                return;

            this.playSound(this.findAnswer.audio);
        },
        close() {
            this.dialogVisible = false;
            this.$emit("close");
        },
        playSound(id) {
            this.$refs.taiAudio.src = `http://${process.env.PUBLIC_PATH}/${this.dirName}/audio/${id}`;
        },
        playend() {
            // if (!this.findAnswer)
            //     return;

            // if (this.findAnswer.correct == true) {
            //     setTimeout(() => {
            //         this.close();
            //     }, 5000);
            // }
        },
        submitAnswer(idx) {
            console.log(idx);
            console.log(this.questionArr);
            // let 
            // if (!this.findAnswer) {
            //     return;
            // }
            // this.questionId += 1;
            if(this.questionArr.toString().search(idx) > -1) {
                this.questionId = this.questionArr[idx];
            } else {
                //发送数据
            }
            // let hits = this.findAnswer.hints;
            // let rndIdx = Math.floor(Math.random() * 2);
            // let hit = hits[rndIdx];
            // this.hits = hit.text;
            // this.playSound(hit.audio);
            //弹出下一题

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
