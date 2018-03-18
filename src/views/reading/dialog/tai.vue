<template>
    <edu-dialog :isShow="dialogVisible"
        @close="close">
        <span>hello</span>
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
            dialogVisible: false,
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
            this.loadQuestion(this.questionId);
        }
    },
    methods: {
        close() {
            this.dialogVisible = false;
            this.$emit("close");
        },
        loadQuestion(id) {
            console.log("现在要去加载" + id + "编号 问题了");
        }
    }
}
</script>

<style>

</style>
