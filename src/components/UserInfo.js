export class UserInfo {
  constructor({ nameSelector, descriptionSelector, photoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(photoSelector);
    this._userId = this._id;
    this.getUserId = this.getUserId.bind(this);
  }

  //получает данные из профиля
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
      avatar: this._avatar.src,
      _id: this._id
    }
  }

  //вставляет  данные из полей ввода в поля профиля
  setUserInfo(data) { 
    this._name.textContent = data.name; 
    this._description.textContent = data.about;
    this._userId = data._id;
  }

  // изменяет фото профиля 
  changeUserPhoto(data) {
    this._avatar.src = data.avatar;
  }

  //получить айди пользователя 
  getUserId() {
    return this._userId;
  }
}
