export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  //получает данные из профиля
  getUserInfo(nameInput, descriptionInput) {

    nameInput.value = this._name.textContent;
    descriptionInput.value = this._description.textContent;

  }

  //вставляет  данные из полей ввода в поля профиля
  setUserInfo(nameInput, descriptionInput) {
    this._name.textContent = nameInput.value;
    this._description.textContent = descriptionInput.value;
  }
}
