<template>
    <edu-dialog :isShow="dialogVisible"
        @close="close">
        <span>{{this.question}}</span>
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
