export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  //получает данные из профиля
  getUserInfo() {
    const userData = {};
    userData.name = this._name.textContent;
    userData.description = this._description.textContent;
    return userData;
  }

  //вставляет  данные из полей ввода в поля профиля
  setUserInfo(nameInput, descriptionInput) {
    this._name.textContent = nameInput;
    this._description.textContent = descriptionInput;
  }
}
