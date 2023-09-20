export const BASE_URL = "https://api.domainname.vikrause1.nomoredomainsrocks.ru";

export const checkResponse = (res) => {
    return (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const registerUser = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    }).then(checkResponse);
}

export const loginUser = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
}

export const getToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    }).then(checkResponse);
}
