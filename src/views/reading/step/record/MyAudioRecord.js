var AudioContext = window.AudioContext || window.webkitAudioContext;
var context;
var recorder;
window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    }
    catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}

function hasGetUserMedia() {
    // Note: Opera builds are unprefixed.
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
    // Good to go!
} else {
    alert('getUserMedia() is not supported in your browser');
}

function MyAudioRecord() {
    this.start = innerStart;
    this.stop = innerStop;
    this.cancel = innerCancel;
    this.data = innerCreateData;
}

function innerStart() {
    _fetchDevices(function() {
        if (recorder) {
            console.log("asd", recorder.encoding);
            recorder.startRecording();
            recorder.onComplete = innerComplete
        }
    })
}

function innerStop() {
    if (recorder) {
        recorder.finishRecording();
    }
}

function innerCancel() {
    if (recorder) {
        recorder.cancelRecording();
    }
}

function innerCreateData() {

}

function innerComplete(blob, rec) {
    console.log("aaaaa", blob, rec);
}

function _fetchDevices(callback) {
    console.log("获取设备");
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        console.log(`默认设备ID为${stream.id}`);
        var sourceNode = context.createMediaStreamSource(stream);
        recorder = new WebAudioRecorder(sourceNode, { workerDir: "thirds/", options: { timeLimit: 60 } });
        // 设置录音参数
        recorder.setOptions({
            timeLimit: 60,
            encodeAfterRecord: false,
            ogg: {
                quality: 0.5
            }
        });
        recorder.setEncoding("ogg"); // 设置编码格式
        console.log("初始化录音实例", recorder);

        callback && callback();
    })
}

module.exports = MyAudioRecord;