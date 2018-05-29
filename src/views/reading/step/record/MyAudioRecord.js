// var AudioContext = window.AudioContext || window.webkitAudioContext;
// var context;
// var recorder;
// window.addEventListener('load', init, false);
// function init() {
//     try {
//         // Fix up for prefixing
//         window.AudioContext = window.AudioContext || window.webkitAudioContext;
//         context = new AudioContext();
//     }
//     catch (e) {
//         alert('Web Audio API is not supported in this browser');
//     }
// }

// function hasGetUserMedia() {
//     // Note: Opera builds are unprefixed.
//     return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//         navigator.mozGetUserMedia || navigator.msGetUserMedia);
// }

// if (hasGetUserMedia()) {
//     // Good to go!
// } else {
//     alert('getUserMedia() is not supported in your browser');
// }

// function MyAudioRecord() {
//     this.start = innerStart;
//     this.stop = innerStop;
//     this.cancel = innerCancel;
//     this.data = innerCreateData;
//     this.getBlobURL = innerGetBlobURL;
// }

// function innerStart() {
//     _fetchDevices(function() {
//         if (recorder) {
//             recorder.startRecording();
//         }
//     })
// }

// function innerStop() {
//     if (recorder) {
//         recorder.finishRecording();
//         recorder.onComplete = innerComplete;
//     }
// }

// function innerCancel() {
//     if (recorder) {
//         recorder.cancelRecording();
//     }
// }

// function innerCreateData() {

// }

// function innerComplete(blob, rec) {
//     this.blob = blob;
// }

// function innerGetBlobURL() {
//     return this.blob;
// }

// function _fetchDevices(callback) {
//     console.log("获取设备");
//     navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
//         console.log(`默认设备ID为${stream.id}`);
//         var sourceNode = context.createMediaStreamSource(stream);
//         recorder = new WebAudioRecorder(sourceNode, { workerDir: "static/thirds/" });
//         // 设置录音参数
//         recorder.setOptions({
//             timeLimit: 60,
//             ogg: {
//                 quality: 0.5
//             },
//             mp3: {
//                 bitRate: 192
//             }
//         });
//         recorder.setEncoding("mp3"); // 设置编码格式
//         console.log("初始化录音实例", recorder);

//         callback && callback();
//     })
// }

// module.exports = MyAudioRecord;

export default class MyAudioRecord {
    constructor() {
        self = this;
        this._init();
        this.recorder;
        this.volume;
        this.volumeLevel = 0;
        this.currentEditedSoundIndex;
    }

    _init() {
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            window.URL = window.URL || window.webkitURL || window.mozURL;
            self.context = new AudioContext();
        }
        catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    }

    start() {
        this._fetchDevices(() => {
            if (this.recorder) {
                this.recorder.startRecording();
            }
        })
    }

    pause() {
        if (this.recorder) {
            this.recorder.startRecording();
        }
    }

    stop() {
        if (this.recorder) {
            this.recorder.finishRecording();
            this.recorder.onComplete = (rec, blob) => {
                this.bloburl = URL.createObjectURL(blob);

                console.log("on complete", this.bloburl);
            }
        }

    }

    cancel() {
        if (this.recorder) {
            this.recorder.cancelRecording();
        }
    }

    getBlobURL() {
        // if (this.recorder) {
        //     return this.bloburl;
        // }

        // return null;
        return this.bloburl;
    }

    _fetchDevices(callback) {
        console.log("获取设备");
        // navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        //     this._getDeviceSuccess(stream, callback)
        // });
        navigator.getUserMedia({ audio: true }, this._startUserMedia, function(e) {
            console.warn('No live audio input: ' + e);
        });
    }

    _startUserMedia(stream) {
        console.log("aaaaa", stream);
        var input = self.context.createMediaStreamSource(stream);
        console.log('Media stream created.');

        self.volume = self.context.createGain();
        self.volume.gain.value = self.volumeLevel;
        input.connect(self.volume);
        self.volume.connect(self.context.destination);
        console.log('Input connected to audio context destination.');

        self.recorder = new Recorder(input);
        console.log('Recorder initialised.');
    }

    _getDeviceSuccess(stream, callback) {
        console.log(`默认设备ID为${stream.id}`);
        var sourceNode = this.context.createMediaStreamSource(stream);
        console.log(this);
        this.recorder = new WebAudioRecorder(sourceNode, { workerDir: "static/thirds/" });
        // 设置录音参数
        this.recorder.setOptions({
            timeLimit: 60,
            ogg: {
                quality: 0.5
            },
            mp3: {
                bitRate: 192
            }
        });
        this.recorder.setEncoding("mp3"); // 设置编码格式
        console.log("初始化录音实例", this.recorder);

        callback && callback();
    }
}