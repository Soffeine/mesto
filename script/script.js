import { Card } from './cards.js';
import { FormValidator } from './formValidator.js';
import { PopupWithImage } from './PopupWhithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';


//кнопки в разметке для вызова попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


//массив с дефолтными карточками
const initialPlaces = [
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


//поля в разметке с именем и деятельностью
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const addForm = document.forms.addForm;  //ФОРМА добавления карточки
const editForm = document.forms.editForm;  //ФОРМА редактирвания профиля

//поля в форме добавления новой карточки
const inputPlaceName = addForm.elements.inputPlaceName;
const inputPlaceImage = addForm.elements.inputPlaceImage;

// поля для редактирования информации профиля
const inputName = editForm.elements.inputName;
const inputDescription = editForm.elements.inputDescription;


//объект валидации
const validationConfig = {
  popupForm: '.popup-form',
  popupInput: '.popup-form__information',
  popupInputError: 'popup-form__information_error',
  submitButton: '.popup__button',
  submitButtonValid: 'popup__button_valid'
}

//валидация формы добавления карточки
const addFormValidation = new FormValidator(addForm, validationConfig);
//вызов валидации формы добавления карточки
addFormValidation.enableValidation();
//валидация формы редактирования профиля
const editFormValidation = new FormValidator(editForm, validationConfig);
editFormValidation.enableValidation();

//функция для открытия полного изображения для класса CARD
function openFullImage(name, link) {
  const handleFullImagePopup = new PopupWithImage('.popup-image');
  handleFullImagePopup.open(name, link);
  handleFullImagePopup.setEventListeners();
}

//рендеринг карточки на страницу
function createCard(placeData) {
  const place = new Card(placeData, '#place-card', openFullImage);
  const placeElement = place.generateCard();
  return placeElement;
}

//создание карточек из массива
const DefaultPlaces = new Section({
  data: initialPlaces,
  renderer: (item) => {
    DefaultPlaces.addItem(createCard(item));
  }
}, '.places');
DefaultPlaces.createItems();


//сабмит добавления нового места
const addPopupHandler = new PopupWithForm({
  popupSelector: '.popup-add',
  submitHandler: (futureValues) => {
    const newPlace = new Section({
      data: [futureValues],
      renderer: (item) => {
        newPlace.addItem(createCard(item));
      }
    }, '.places');
    newPlace.createItems();
  }
});

//слушатель на клик формы добавления карточки
addButton.addEventListener('click', () => {
  addPopupHandler.open();
  addPopupHandler.setEventListeners();
});


const userInfoEdit = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const editPopupHandler = new PopupWithForm({
  popupSelector: '.popup-edit',
  submitHandler: () => {
    userInfoEdit.setUserInfo(inputName, inputDescription);;
    editPopupHandler.close();
  }
});

editButton.addEventListener('click', () => {
  editPopupHandler.open();
  userInfoEdit.getUserInfo(inputName, inputDescription);
  editPopupHandler.setEventListeners();
})

