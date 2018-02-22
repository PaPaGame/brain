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

export function createData(info) {
    return ajax({
        url: "/school",
        method: "post",
        data: info
    });
}

export function updateData(info) {
    return ajax({
        url: "/school",
        method: "put",
        data: info
    });
}