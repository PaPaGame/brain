import ajax from "@/utils/ajax";

const staff = {
    fetchTeacherByFuzzyName(query) {
        return ajax({
            url: "/staff/fuzzy",
            method: "post",
            params: query
        });
    },
    fetchStaffList(query) {
        return ajax({
            url: "/staff/getList",
            method: "post",
            params: query
        })
    },
    addStaff(info) {
        return ajax({
            url: "/staff",
            method: "post",
            params: info
        });
    },
    deleteStaff(info) {
        return ajax({
            url: "/staff/delete",
            method: "post",
            params: info
        })
    },

    getTotalStaffCount() {
        return ajax({
            url: "/staff/count",
            method: "post"
        })
    }
};

export default staff;