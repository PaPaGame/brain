import ajax from "@/utils/ajax";
///student/fuzzy/:name

export function FetchTeacherByFuzzyName(query) {
    return ajax({
        url: "/staff/fuzzy/" + query,
        method: "get"
    });
}