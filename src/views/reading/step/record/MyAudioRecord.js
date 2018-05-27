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
}

function innerStart() {
    fetchDevices();
}

function fetchDevices() {
    console.log("获取设备");
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        console.log(`默认设备ID为${stream.id}`);
        var sourceNode = context.createMediaStreamSource(stream);
        recorder = new WebAudioRecorder(sourceNode, { workerDir: "thirds/", options: { timeLimit: 5 } });
        console.log("初始化录音实例", recorder);
    })
}

module.exports = MyAudioRecord;