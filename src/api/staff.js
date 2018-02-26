import ajax from "@/utils/ajax";

const staff = {
    fetchTeacherByFuzzyName(query) {
        return ajax({
            url: "/staff/fuzzy/" + query,
            method: "get"
        });
    }
};

export default staff;