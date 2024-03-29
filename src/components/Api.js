export default class Api {
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(this._checkStatus); 
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(this._checkStatus);
    }

    setProfileInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._checkStatus);
    }

    addNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST', 
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkStatus);
    }

    setLikeCount(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._checkStatus);
    }

    deleteLikeCount(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkStatus);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkStatus);
    }

    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkStatus);
    }

}
