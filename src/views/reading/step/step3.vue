<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc3")}}</span>
        </div>
        <div class='btn-group'>
            <el-button type="primary" @click="startRecord" v-if="!this.recording">{{$t('reading.record2')}}</el-button>
            <el-button type="primary" @click="stopRecord" e-else>{{$t('reading.stopRecord')}}</el-button>
            <!-- <el-button type="warning">{{$t('reading.playmyreading')}}</el-button> -->
        </div>
    </div>
</template>

<script>
import AudioRecorder from "./record/AudioRecorder";
export default {
    data() {
        return {
            recorder: null,
            recording: false
        }
    },
    mounted() {
        this.recorder = new AudioRecorder();
    },
    methods: {
        startRecord() {
            this.recording = true;
            this.recorder.start();
        },
        stopRecord() {
            this.recording = false;
            this.recorder.stop();
        }
    }
}
</script>

<style lang="scss">
@import "./step.scss";
</style>
