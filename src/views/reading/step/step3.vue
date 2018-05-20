<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc3")}}</span>
        </div>
        <div class='btn-group'>
            <el-button type="primary" @click="startRecord" v-show="!recording">{{$t('reading.record2')}}</el-button>
            <el-button type="primary" @click="stopRecord" v-show="recording">{{$t('reading.stopRecord')}}</el-button>
            <el-button type="warning" @click="playMyRecord" v-show="hasRecord">{{$t('reading.playmyreading')}}</el-button>
            <el-button @click="uploadMyRecord" v-show="hasRecord">{{$t('reading.upload')}}</el-button>
        </div>
    </div>
</template>

<script>
import AudioRecorder from "./record/AudioRecorder";
export default {
    data() {
        return {
            recorder: null,
            recording: false,
            hasRecord: false
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
            this.hasRecord = true;
            // url 是 一个blob， 把他赋值给audio 就可以播放了
            this.recorder.stop(url => {

            });
        },
        playMyRecord() {

        },
        uploadMyRecord() {
            this.hasRecord = false;
        }
    }
}
</script>

<style lang="scss">
@import "./step.scss";
</style>
