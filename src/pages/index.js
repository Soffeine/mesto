import { Card } from '../script/cards.js';
import { FormValidator } from '../script/formValidator.js';
import { PopupWithImage } from '../script/PopupWhithImage.js';
import { PopupWithForm } from '../script/PopupWithForm.js';
import { Section } from '../script/Section.js';
import { UserInfo } from '../script/UserInfo.js';
import {
  editButton,
  addButton,
  initialPlaces,
  addForm,
  editForm,
  inputName,
  inputDescription,
  validationConfig
} from '../utils/constants.js';
import './index.css';
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
function createCard(item) {
  const place = new Card({ name: item.name, link: item.link }, '#place-card', openFullImage);
  const placeElement = place.generateCard();
  return placeElement;
}

//создание карточек из массива
const DefaultPlaces = new Section({
  data: initialPlaces,
  renderer: (data) => {
    DefaultPlaces.addItem(createCard(data));
  }
}, '.places');



//сабмит добавления нового места
const addPopupHandler = new PopupWithForm({
  popupSelector: '.popup-add',
  submitHandler: (futureValues) => {
    DefaultPlaces.addItem(createCard({ name: futureValues.inputPlaceName, link: futureValues.inputPlaceImage }));
  }
});
DefaultPlaces.createItems();


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

