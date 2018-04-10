import ajax from "@/utils/ajax";

const course = {
    fetchAllCourse(query) {
        return ajax({
            url: "/course/get",
            method: "post",
            params: query
        });
    }
};

export default course;