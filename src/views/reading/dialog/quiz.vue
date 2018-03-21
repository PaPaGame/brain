<template>
    <edu-dialog :isShow="dialogVisible" @close="close">

    </edu-dialog>
</template>

<script>
import eduDialog from "@/components/Dialog/dialog";
export default {
    components: {
        eduDialog
    },
    data() {
        return {
            dialogVisible: false
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
            this.getTaiInfo({ dirName: this.dirName, taiId: this.questionId });
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
        ...mapActions(["getQuizInfo"])
    },
    computed: {
        ...mapGetters({
            dirName: "dirName",
            quizs: "quizs"
        })
    }

}
</script>

<style>

</style>
