<template>
    <section>
        <span>Grade</span>
        <el-button @click="onRecord">record</el-button>
        <el-button @click="onCancel">cancel</el-button>
        <el-button @click="onStop">stop</el-button>
        <el-button @click="onPlay">play</el-button>
        <audio ref="audio_play" controls autoplay></audio>
    </section>
</template>

<script>
import MyAudioRecord from "../reading/step/record/MyAudioRecord";
// import * as Recorder from "recordmp3js";
// import { Recorder, initRecorder } from "recordmp3js";
export default {
    data() {
        return {
            recorder: null,
            context: null,
            bloburl: ""
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
            if (this.recorder) {
                this.bloburl = this.recorder.getBlobURL();
                this.$refs.audio_play.src = this.bloburl
                console.log("Play Record", this.bloburl);
            }
            // this.bloburl = this.recorder.getBlobURL();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./grade.scss";
</style>
