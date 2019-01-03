import fs from 'fs';
export default class FileSaver {
  constructor() {

  }

  set uid(value) {
    this._uid = value;
  }

  get uid() {
    return this._uid;
  }

  set cid(value) {
    this._cid = value;
  }

  get cid() {
    return this._cid;
  }

  set file(value) {
    this._file = value;
  }

  get file() {
    return this._file;
  }

  async save() {
    if (!this.uid || !this.cid || !this.file) {
      console.log('1:', this.uid);
      console.log('2:', this.cid);
      console.log('3:', this.file);
      return false;
    }

    let file = this.file;
    let audioData = file.contents.split(';base64,').pop();

    return await fs.writeFile(file.name, audioData, {
      encoding: 'base64'
    }, err => {
      if (err) {
        console.log('write file failed', err);
      }
    });
  }
}
