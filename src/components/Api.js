import { data } from "autoprefixer";

export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    // обработка ответа от сервера
    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Произошла ошибка ${res.status}`)
        }
    }


    // Загрузить информацию о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponseData)
    }


    // Загрузить карточки с сервера
    getPlaceInfo() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponseData)
    }


    // Редактирование профиля 
    editProfileInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    }


    // Редактирование профиля 
    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    }

    // Добавление новой карточки
    addNewCard(item) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then(this._getResponseData)
    }

    //  Удалние карточки
    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData)
    }

    // постановка лайка
    putLike(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponseData)
    }

    // снятие лайка
    deleteLike(_id) {

        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseData)
    }


}