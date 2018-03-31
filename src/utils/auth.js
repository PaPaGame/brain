const TOKEN_NAME = 'brain_token';

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_NAME);
}