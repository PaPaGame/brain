import ajax from "@/utils/ajax";
///student/fuzzy/:name

const student = {
    FetchStudentByFuzzyName(query) {
        return ajax({
            url: "/student/fuzzy/" + query,
            method: "get"
        });
    },

    FetchStudents() {
        return ajax({
            url: "/student",
            method: "get"
        });
    }
};


export default student;