import ajax from "@/utils/ajax";

const group = {
    fetchClass(query) {
        return ajax({
            url: "/class",
            method: "get",
            params: query
        });
    },

    deleteClass(query) {
        return ajax({
            url: "/class",
            method: "delete",
            data: query
        });
    },

    createClass(info) {
        return ajax({
            url: "/class",
            method: "post",
            data: info
        });
    },

    updateClass(info) {
        return ajax({
            url: "/class",
            method: "put",
            data: info
        });
    },
    getFuzzyGroup(query) {
        return ajax({
            url: "/class/fuzzyGroup",
            method: "post",
            data: query
        })
    }
};


export default group;