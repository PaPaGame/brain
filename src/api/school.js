import ajax from "@/utils/ajax";

export function fetchData(query) {
    return ajax({
        url: "/school",
        method: "get",
        params: query
    });
}

export function deleteData(query) {
    return ajax({
        url: "/school",
        method: "delete",
        data: query
    });
}