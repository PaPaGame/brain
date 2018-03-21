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
    }
};

export default staff;