export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  //получает данные из профиля
  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  //вставляет  данные из полей ввода в поля профиля
  setUserInfo(data) { 
    this._name.textContent = data.name; 
    this._description.textContent = data.description; 
  } 
}
