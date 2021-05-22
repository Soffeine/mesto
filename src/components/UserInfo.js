export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  //получает данные из профиля
  getUserInfo() {
    this._futureValues = {};
    this._futureValues.name = this._name.textContent;
    this._futureValues.description = this._description.textContent;
    return this._futureValues;
  }

  //вставляет  данные из полей ввода в поля профиля
  setUserInfo(nameInput, descriptionInput) {
    this._name.textContent = nameInput.value;
    this._description.textContent = descriptionInput.value;
  }
}
