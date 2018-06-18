<script>
import RecordRTC from 'recordrtc';
import { mapGetters } from 'vuex';
import dayjs from "dayjs";
import courseService from "@/api/course";
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
                    recordContent: ""
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


            this._recordRTC.getDataURL(audioDataURL => {
                this.recordContent = audioDataURL;
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
            let fileName = dayjs().format("YYYYMMDDHHmmss");
            console.log(fileName);
            this.recordContent = "solszl";
            let file = {
                audio: {
                    name: fileName + ".wav",
                    type: "audio/wav",
                    contents: this.recordContent
                }
            };

            console.log(this.recordContent);
            let postData = {};
            postData.uid = this.userinfo.id;
            postData.cid = this.cid || "5adb168f6f036e0f0527a253";
            postData.file = file;
            courseService.postRecord(postData);
        }
    },
    destroyed() {
        this.stopRecording()
    },
    computed: {
        ...mapGetters({
            userinfo: "userinfo",
            cid: "cid"
        })
    }

}
</script>

<template >
    <div>
        <el-button @click="startRecording">{{$t('reading.record2')}}</el-button>
        <el-button @click="stopRecording">{{$t('reading.stopRecord')}}</el-button>
        <el-button @click="uploadRecord">{{$t('reading.upload')}}</el-button>
    </div>
</template>


<style lang="scss" scoped>
</style>