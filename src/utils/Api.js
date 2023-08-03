class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        return (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    setUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    addCardLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
            method: 'PUT',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    removeCardLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    removeCard(cardData) {
        return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    updateAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '19829aee-46a8-4b5d-8f84-0b42e3127f3f',
        'Content-Type': 'application/json'
    }
});

export default api;
