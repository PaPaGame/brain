<template>
    <edu-dialog :isShow="dialogVisible"
        @close="close"
        :title="this.question.question">
        <el-radio-group v-model="radioLabel"
            @change="onRadioChange(radioLabel)">
            <el-radio v-for="(option,index) in question.answers"
                :key="index"
                :label="option.answer"></el-radio>
        </el-radio-group>
        <el-button @click="submitAnswer">
            <i class="iconfont icon-laba"></i>{{$t('reading.commit')}}</el-button>
        <transition name="list">
            <div v-show="hits!=''">{{hits}}</div>
        </transition>

        <audio ref="taiAudio"
            autoplay
            @ended="playend"></audio>
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

<style>

</style>
