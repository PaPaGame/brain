import { Cookies } from "js-cookie";

const TokenKey = 'admin-token';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(key, token) {
    Cookies.set(key, token);
}

export function removeToken() {
    Cookies.remove(TokenKey);
}