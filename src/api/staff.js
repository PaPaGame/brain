import ajax from "@/utils/ajax";

const staff = {
    fetchTeacherByFuzzyName(query) {
        return ajax({
            url: "/staff/fuzzy",
            method: "post",
            data: query
        });
    },
    fetchStaffList(query) {
        return ajax({
            url: "/staff/getList",
            method: "post",
            data: query
        })
    },
    addStaff(info) {
        return ajax({
            url: "/staff",
            method: "post",
            data: info
        });
    },
    deleteStaff(info) {
        return ajax({
            url: "/staff/delete",
            method: "post",
            data: info
        })
    }
};

export default staff;