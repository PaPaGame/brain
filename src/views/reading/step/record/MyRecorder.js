export default class MyRecorder {

    constructor() {
    }

    getDevices() {
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true }, s => {
                console.log("default audio input:", s);
                this.stream = s;
            }, e => {
                console.log("get devices failed", e);
            });
        } else {
            console.error('navigator.getUserMedia not present');
        }
    }

    start() {

    }

    stop() {

    }

    play() {

    }

    upload() {

    }
}