import ajax from "@/utils/ajax";

export function fetchClass(query) {
    return ajax({
        url: "/class",
        method: "get",
        params: query
    });
}

export function deleteClass(query) {
    return ajax({
        url: "/class",
        method: "delete",
        data: query
    });
}

export function createClass(info) {
    return ajax({
        url: "/class",
        method: "post",
        data: info
    });
}

export function updateClass(info) {
    return ajax({
        url: "/class",
        method: "put",
        data: info
    });
}