import ajax from "@/utils/ajax";

export function fetchData(query) {
    return ajax({
        url: "/school",
        method: "get",
        params: query
    });
}