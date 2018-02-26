import ajax from "@/utils/ajax";

const staff = {
    FetchTeacherByFuzzyName(query) {
        return ajax({
            url: "/staff/fuzzy/" + query,
            method: "get"
        });
    }
};

export default staff;