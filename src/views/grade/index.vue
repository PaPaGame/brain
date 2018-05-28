<template>
    <section>
        <span>Grade</span>
        <el-button @click="onRecord">record</el-button>
        <el-button @click="onCancel">cancel</el-button>
        <el-button @click="onStop">stop</el-button>
        <el-button @click="onPlay">play</el-button>
    </section>
</template>

<script>
import MyAudioRecord from "../reading/step/record/MyAudioRecord";
export default {
    data() {
        return {
            recorder: null
        }
    },
    methods: {
        onRecord() {
            console.log("Start Recording");
            this.recorder = new MyAudioRecord();
            this.recorder.start();
        },
        onCancel() {
            if (!this.recorder) {
                return;
            }
            this.recorder.cancel();
            console.log("Cancel Recording");
        },
        onStop() {
            if (!this.recorder) {
                return;
            }
            this.recorder.stop();
            console.log("Stop Recording");
        },
        onPlay() {
            console.log("Play Record");
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./grade.scss";
</style>
