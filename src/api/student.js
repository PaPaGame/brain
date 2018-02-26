import ajax from "@/utils/ajax";

const student = {
    fetchStudentByFuzzyName(query) {
        return ajax({
            url: "/student/fuzzy/" + query,
            method: "get"
        });
    },

    fetchStudents() {
        return ajax({
            url: "/student",
            method: "get"
        });
    }
};


export default student;