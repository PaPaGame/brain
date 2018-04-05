import ajax from "@/utils/ajax";

const group = {
    fetchClass(query) {
        return ajax({
            url: "/class/getAll",
            method: "post",
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
            params: info
        });
    },

    updateClass(info) {
        return ajax({
            url: "/class/update",
            method: "post",
            params: info
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