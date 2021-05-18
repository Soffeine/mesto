//кнопки в разметке для вызова попапов
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');


//массив с дефолтными карточками
export const initialPlaces = [
  {
    name: 'Афины, Греция',
    link: 'https://raw.githubusercontent.com/Soffeine/mesto/main/images/Athens.JPG'
  },
  {
    name: 'Стамбул, Турция',
    link: 'https://raw.githubusercontent.com/Soffeine/mesto/main/images/Istanbul.JPG'
  },
  {
    name: 'Териберка, Россия',
    link: 'https://raw.githubusercontent.com/Soffeine/mesto/main/images/teriberka.JPG'
  },
  {
    name: 'Пекин, Китай',
    link: 'https://raw.githubusercontent.com/Soffeine/mesto/main/images/Beijing.JPG'
  },
  {
    name: 'Шанхай, Китай',
    link: 'https://raw.githubusercontent.com/Soffeine/mesto/main/images/Shanghai.JPG'
  },
  {
    name: 'Сучжоу, Китай',
    link: 'https://raw.githubusercontent.com/Soffeine/mesto/main/images/Suzhou.JPG'
  },
];


export const addForm = document.forms.addForm;  //ФОРМА добавления карточки
export const editForm = document.forms.editForm;  //ФОРМА редактирвания профиля



// поля для редактирования информации профиля
export const inputName = editForm.elements.inputName;
export const inputDescription = editForm.elements.inputDescription;


//объект валидации
export const validationConfig = {
  popupForm: '.popup-form',
  popupInput: '.popup-form__information',
  popupInputError: 'popup-form__information_error',
  submitButton: '.popup__button',
  submitButtonValid: 'popup__button_valid'
}