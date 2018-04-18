<template>
    <edu-dialog :isShow="dialogVisible" @close="close" :title="this.question.question" class="tai-dialog-panel">
        <el-radio-group v-model="radioLabel" @change="onRadioChange(radioLabel)">
            <el-radio v-for="(option,index) in question.answers" :key="index" :label="option.answer" class="radio-item"></el-radio>
        </el-radio-group>
        <transition name="list">
            <div class="question_hint" v-show="hits!=''">
                <p class="hint_text">{{hits}}</p>
            </div>
        </transition>
        <div class="question_button">
            <el-button @click="submitAnswer" class="btn-submit">
                <i class="iconfont icon-laba"></i>{{$t('reading.commit')}}</el-button>
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
            radioLabel: "",
            findAnswer: null,
            hits: ""
        };
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
            this.hits = hit.text;
            this.playSound(hit.audio);
            // TODO: 发送数据
        },
        close() {
            this.dialogVisible = false;
            this.hits = "";
            this.$emit("close");
        },
        playSound(id) {
            this.$refs.taiAudio.src = `http://${process.env.PUBLIC_PATH}/${this.dirName}/audio/${id}`;
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
            question: "question"
        })
    }
}
</script>

<style lang="scss" scoped>
.el-dialog {
  width: 100%;
  .tai-dialog-panel {
    width: 415px;
  }
}

.el-dialog__title {
  line-height: 24px;
  font-size: 13px;
  color: #ff0000;
}

.radio-item {
  width: 300px;
  line-height: 20px;
  padding: 4px 30px 4px 26px;
  margin-left: 0px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #333;
}
.question_button {
  text-align: right;
  margin-top: 3px;
  padding-right: 23px;
  .btn-submit {
    width: 87px;
    border-radius: 8px;
  }
}

.question_hint {
  min-height: 50px;
  width: 100%;
  background-color: #cbe3f9;
  margin: 11px 0 0 9px;
  .hint_text {
    font-family: Arial;
    font-size: 13px;
    padding: 14px 15px 16px 10px;
  }
}
</style>
