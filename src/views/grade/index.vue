<!--<template>
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
-->
<script>
import RecordRTC from 'recordrtc';
import { mapGetters } from 'vuex';
import dayjs from "dayjs";
export default {
    props: {
        options: {
            default() {
                return {
                    type: 'audio',
                    mimeType: 'video/webm',
                    bufferSize: 0,
                    sampleRate: 44100,
                    leftChannel: false,
                    disableLogs: false,
                    // recorderType: webrtcDetectedBrowser === 'edge' ? StereoAudioRecorder : null
                }
            }
        }
    },
    data() {
        return {
            isRecording: false,
        }
    },
    methods: {
        record() {
            console.log("æ");
            var recordRTC = RecordRTC(mediaStream);
            recordRTC.startRecording();
            recordRTC.stopRecording(function(audioURL) {
                audio.src = audioURL;
                var recordedBlob = recordRTC.getBlob();
                recordRTC.getDataURL(function(dataURL) { });
            })
        },
        captureUserMedia(mediaConstraints, successCallback, errorCallback) {
            var isBlackBerry = !!(/BB10|BlackBerry/i.test(navigator.userAgent || ''));
            if (isBlackBerry && !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                navigator.getUserMedia(mediaConstraints, successCallback, errorCallback);
                return
            }
            navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback)
        },
        _addStreamStopListener(stream, callback) {
            var streamEndedEvent = 'ended'
            if ('oninactive' in stream) {
                streamEndedEvent = 'inactive'
            }
            this._stream.addEventListener(streamEndedEvent, function() {
                callback()
                callback = function() { }
            }, false)
            this._stream.getAudioTracks().forEach(function(track) {
                track.addEventListener(streamEndedEvent, function() {
                    callback()
                    callback = function() { }
                }, false)
            })
        },
        // CORE
        startRecording() {
            this.captureUserMedia(
                { audio: true },
                (audioStream) => {
                    this.$emit('record:start')
                    this.isRecording = true
                    // recordingPlayer.srcObject = audioStream;
                    // recordingPlayer.play();
                    //
                    // config.onMediaCaptured(audioStream);
                    this._stream = audioStream
                    this._recordRTC = RecordRTC(audioStream, this.options)
                    this._recordRTC.startRecording()
                    this._addStreamStopListener(audioStream, () => {
                        this.isRecording = false
                        // config.onMediaStopped();
                    })
                },
                (error) => {
                    this.$emit('record:error')
                    this.isRecording = false
                    // config.onMediaCapturingFailed(error);
                })
        },
        stopRecording() {
            if (!this._recordRTC)
                return;
            this._recordRTC.stopRecording((url) => {
                this._stream.stop()
                this.$emit('record:success', url)
                this.playbackAudio(url)
            })
            this._recordRTC = null;
        },
        playbackAudio(url) {
            var audio = new Audio()
            audio.src = url
            audio.controls = true
            audio.play();
            audio.onended = function() {
                audio.pause();
                // audio.src = URL.createObjectURL(button.recordRTC.blob);
            };
        },
        uploadRecord() {
            let fileName = dayjs().toString("YYYYMMDDHHmmss");
            console.log(fileName);
            this._recordRTC.getDataURL(audioDataURL => {
                let file = {
                    audio: {
                        name: fileName + ".wav",
                        type: "audio/wav",
                        contents: audioDataURL
                    }
                };
            })
        }
    },
    destroyed() {
        this.stopRecording()
    },
    computed: {
        ...mapGetters({
            userinfo: "userinfo"
        })
    }

}
</script>

<template >
    <div>
        <el-button @click="startRecording">start</el-button>
        <el-button @click="stopRecording">stop</el-button>
        <el-button @click="uploadRecord">upload</el-button>
    </div>
</template>


<style lang="scss" scoped>
</style>