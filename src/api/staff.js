import ajax from "@/utils/ajax";

const staff = {
    fetchTeacherByFuzzyName(query) {
        return ajax({
            url: "/staff/fuzzy/" + query,
            method: "get"
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
    }
};

export default staff;