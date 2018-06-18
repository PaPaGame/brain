import fs from "fs";
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

    set content(value) {
        this._content = value;
    }

    get content() {
        return this._content;
    }

    async save() {
        if(!this.uid || !this.cid ||!this.content) {
            console.log("1:",this.uid);
            console.log("2:",this.cid);
            console.log("3:",this.content);
            return;
        }

        // return await fs
    }
}