import ajax from "@/utils/ajax";

const school = {
    fetchData(query) {
        return ajax({
            url: "/school/all",
            method: "post",
            params: query
        });
    },

    deleteData(query) {
        return ajax({
            url: "/school/delete",
            method: "post",
            params: query
        });
    },

    createData(info) {
        return ajax({
            url: "/school/create",
            method: "post",
            params: info
        });
    },

    updateData(info) {
        return ajax({
            url: "/school/update",
            method: "post",
            params: info
        });
    },

    getFuzzySchoolList(fuzzy) {
        return ajax({
            url: "/school/fuzzyList",
            method: "post",
            params: fuzzy
        })
    }
};
export default school;