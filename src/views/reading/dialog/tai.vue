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
            dialogVisible: false
        };
    },
    props: {
        isShow: { type: Boolean, default: false }
    },
    watch: {
        isShow() {
            this.dialogVisible = this.isShow;
        }
    },
    methods: {
        close() {
            this.dialogVisible = false;
            this.$emit("close");
        }
    }
}
</script>

<style>

</style>
