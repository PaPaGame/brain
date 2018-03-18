<template>
    <!-- <edu-dialog @close="this.close"
        :isShow="dialogVisible">
        <span>hello</span>
    </edu-dialog> -->
    <edu-dialog :isShow="dialogVisible"
        @close="close">
    </edu-dialog>
    <!-- <div>
        <audio ref="taiAudio"></audio>
        <span>this is Tai</span>
        <el-button @click="closePopUp">cancel</el-button>
    </div> -->
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
            // this.getTaiInfo();//this.dirName, this.questionId
            console.log(this.questionId);
        }
    },
    methods: {
        close() {
            this.dialogVisible = false;
            this.$emit("close");
        },
        // ...mapActions(["getTaiInfo"])
        closePopUp() {
            this.$emit('closePopUp')
        }
    },
    computed: {
        ...mapGetters({
            dirName: "dirName"
        })
    }
}
</script>

<style>

</style>
