import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
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

const handleFullImagePopup = new PopupWithImage('.popup-image');

//функция для открытия полного изображения для класса CARD
function openFullImage(name, link) {
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
const addPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  submitHandler: (futureValues) => {
    DefaultPlaces.addItem(createCard({ name: futureValues.inputPlaceName, link: futureValues.inputPlaceImage }));
  }
});
DefaultPlaces.createItems();


//слушатель на клик формы добавления карточки
addButton.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.enableValidation();
});
addPopup.setEventListeners();


const userInfoEdit = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup-edit',
  submitHandler: (futureValues) => {
    userInfoEdit.setUserInfo(inputName, inputDescription);;
    editPopup.close();
  }
});

editButton.addEventListener('click', () => {
  editPopup.open();
  inputName.value = userInfoEdit.getUserInfo().name;
  inputDescription.value = userInfoEdit.getUserInfo().description;
});
editPopup.setEventListeners();

