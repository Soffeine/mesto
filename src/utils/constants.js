//кнопки в разметке для вызова попапов
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');


//массив с дефолтными карточками
export const initialPlaces = [
  {
    name: 'Афины, Греция',
    link: 'https://pitersc.ru/assets/images/df1fe42d8e8dc407c2d3bae622f20a09.jpg'
  },
  {
    name: 'Стамбул, Турция',
    link: 'https://live.staticflickr.com/5699/23863030595_2d1870dfdf_b.jpg'
  },
  {
    name: 'Териберка, Россия',
    link: 'https://photocentra.ru/images/main90/905871_main.jpg'
  },
  {
    name: 'Пекин, Китай',
    link: 'https://cdn.sozvezdie-tour.ru/images/uploadedfiles/56190280-84c8-4e93-bc66-21991dd8dc83.jpg'
  },
  {
    name: 'Шанхай, Китай',
    link: 'https://kitaimir.ru/wp-content/uploads/2019/12/shanhay-kitay-shanghai-china-c0k2.jpg'
  },
  {
    name: 'Сучжоу, Китай',
    link: 'https://amenohitravels.com/wp-content/uploads/2018/12/suzhou01.jpg'
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