import { data } from "autoprefixer";

export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    // Загрузить информацию о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    Promise.reject(`СМОТРИ, КОСЯК ПРИ ПОЛУЧЕНИИ ДАННЫХ ПРОФИЛЯ! ${res.status}`)
                }
            })
    }

    // Загрузить карточки с сервера
    getPlaceInfo() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(console.log(`Ха! Лови ошибку в загрузке карточек ${res.status}`))
                };
            })
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
          .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Не отредактировать тебе профиль с таким кодом ${res.status}`)
            }
        })
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
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Карточка не добавлена ${res.status}`)
            }
        })
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
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`не получается удалить карточку, потому что ${res.status}`)
            }
        })
    }

    //  лайк-каунтер??????????????????
    toggleLikeCount() {
      
    }
}