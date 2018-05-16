<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc3")}}</span>
        </div>
        <div class='btn-group'>
            <el-button type="primary" @click="startRecord" v-if="!this.recording">{{$t('reading.record2')}}</el-button>
            <el-button type="primary" @click="stopRecord" e-else>{{$t('reading.stopRecord')}}</el-button>
            <el-button type="warning" @click="playMyRecord">{{$t('reading.playmyreading')}}</el-button>
            <el-button @click="uploadMyRecord">{{$t('reading.upload')}}</el-button>
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
        },
        playMyRecord() {

        },
        uploadMyRecord() {
            
        }
    }
}
</script>

<style lang="scss">
@import "./step.scss";
</style>
