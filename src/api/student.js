import ajax from "@/utils/ajax";

const student = {
    fetchStudentByFuzzyName(query) {
        return ajax({
            url: "/student/fuzzy",
            method: "post",
            params: query
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
            params: user
        });
    },

    getStudentById(id) {
        return ajax({
            url: "/student/id",
            method: "post",
            params: id
        })
    },

    getAllStudent(query) {
        return ajax({
            url: "/student/all",
            method: "post",
            params: query
        });
    }


};


export default student;