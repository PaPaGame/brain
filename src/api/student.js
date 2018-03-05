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
    },

    addStudent(user) {
        return ajax({
            url: "/student",
            method: "post",
            data: user
        });
    },

    getStudentById(id) {
        return ajax({
            url: "/student/id",
            method: "post",
            data: id
        })
    }


};


export default student;