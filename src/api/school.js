import ajax from "@/utils/ajax";

const school = {
    fetchData(query) {
        return ajax({
            url: "/school",
            method: "get",
            params: query
        });
    },

    deleteData(query) {
        return ajax({
            url: "/school",
            method: "delete",
            data: query
        });
    },

    createData(info) {
        return ajax({
            url: "/school",
            method: "post",
            data: info
        });
    },

    updateData(info) {
        return ajax({
            url: "/school",
            method: "put",
            data: info
        });
    },

    getFuzzySchoolList(fuzzy) {
        return ajax({
            url: "/school/fuzzyList",
            method: "post",
            data: fuzzy
        })
    }
};
export default school;