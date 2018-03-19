<template>
    <edu-dialog :isShow="dialogVisible"
        @close="close"
        :title="this.question.question">
        <el-radio-group v-model="radioModel">
            <el-radio v-for="(option,index) in question.answers"
                :key="option.answer"
                :label="option.answer"></el-radio>
        </el-radio-group>
        <el-button>
            <i class="iconfont icon-laba"></i>{{$t('reading.commit')}}</el-button>
        <audio ref="taiAudio"></audio>
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
            radioModel: ""
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
        close() {
            this.dialogVisible = false;
            this.$emit("close");
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
