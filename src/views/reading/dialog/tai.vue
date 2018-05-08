<template>
    <edu-dialog :isShow="dialogVisible" @close="close" :title="this.question.question" class="tai-dialog-panel dialog-panel">
        <el-radio-group v-model="radioLabel" @change="onRadioChange(radioLabel)">
            <el-radio v-for="(option,index) in question.answers" :key="index" :label="option.answer" class="radio-item"></el-radio>
        </el-radio-group>
        <transition name="list">
            <div class="question_hint" v-show="hits!=''">
                <p class="hint_text">{{hits}}</p>
            </div>
        </transition>
        <div class="question_button">
            <el-button @click="submitAnswer" type="primary" round class="btn-submit">
                {{$t('reading.commit')}}</el-button>
            <!-- <i class="iconfont icon-laba"></i> -->
        </div>
        <audio ref="taiAudio" autoplay @ended="playend"></audio>
    </edu-dialog>
</template>

<script>
import eduDialog from "@/components/Dialog/dialog";
import courseService from "@/api/course";
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        eduDialog
    },
    data() {
        return {
            dialogVisible: false,
            radioLabel: "",
            findAnswer: null,
            hits: "",
            answered: 0 //已经达过(并且答对)的数量
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
            // console.log(this.question)
            this.getTaiInfo({ dirName: this.dirName, taiId: this.questionId });
        }
    },
    methods: {
        onRadioChange(lbl) {
            let ans = this.question.answers;
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
        submitAnswer() {
            if (!this.findAnswer) {
                return;
            }
            let hits = this.findAnswer.hints;
            let rndIdx = Math.floor(Math.random() * 2);
            let hit = hits[rndIdx];
            if(typeof(hit) !='undefined') {
                this.hits = hit.text;
                this.playSound(hit.audio);
            }

            // TODO: 发送数据

            let query = {};
            query.cid = this.cid; // 课程id
            query.taiCount = this.tais.length; // 灯泡数量
            query.answer = { "id": this.questionId, "result": this.findAnswer.correct };//灯泡id 回答对了还是错了
            // console.log(query);
            courseService.answerTai(query).then(res => {
                // 答题的回调
            });

            //如果答对则 增加学习条进度
            if (this.findAnswer.correct) {
                this.answered = this.answered + 1;
                debugger;
                this.$emit('taiprogress', this.answered);
            }
        },
        close() {
            this.dialogVisible = false;
            this.hits = "";
            this.$emit("close");
        },
        playSound(id) {
            this.$refs.taiAudio.src = `${process.env.PUBLIC_PATH}/${this.dirName}/audio/${id}`;
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
        ...mapActions(["getTaiInfo"])
    },
    computed: {
        ...mapGetters({
            dirName: "dirName",
            question: "question",
            cid: "cid",
            tais: "tais"
        })
    }
}
</script>

<style lang="scss">
@import "./dialog.scss";
// .el-dialog {
//   width: 100%;
//   .tai-dialog-panel {
//     width: 415px;
//   }
// }

// .el-dialog__title {
//   line-height: 24px;
//   font-size: 13px;
//   color: #ff0000;
// }

// .radio-item {
//   width: 300px;
//   line-height: 20px;
//   padding: 4px 30px 4px 26px;
//   margin-left: 0px;
//   font-family: Arial, Helvetica, sans-serif;
//   font-weight: 500;
//   font-size: 13px;
//   color: #333;
// }
// .question_button {
//   text-align: right;
//   margin-top: 3px;
//   padding-right: 23px;
//   .btn-submit {
//     width: 87px;
//     border-radius: 8px;
//   }
// }

// .question_hint {
//   min-height: 50px;
//   width: 100%;
//   background-color: #cbe3f9;
//   margin: 11px 0 0 9px;
//   .hint_text {
//     font-family: Arial;
//     font-size: 13px;
//     padding: 14px 15px 16px 10px;
//   }
// }
</style>
