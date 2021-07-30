
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Api } from '../components/Api.js';
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


//экземпляр класса FormValidator для валидации формы добавления карточки
const addFormValidation = new FormValidator(addForm, validationConfig);
//вызов валидации формы добавления карточки
addFormValidation.enableValidation();

//экземпляр класса FormValidator для валидации формы редактирования профиля
const editFormValidation = new FormValidator(editForm, validationConfig);
editFormValidation.enableValidation();

//экземпляр класса открытия карточки
const handleFullImagePopup = new PopupWithImage('.popup-image');
//функция для открытия полного изображения для класса CARD
function openFullImage(name, link) {
  handleFullImagePopup.open(name, link);
}
handleFullImagePopup.setEventListeners();


// экземпляр класса api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: "7f564866-b8ba-4557-8c91-b7d4f8327f3b",
    "Content-Type": "application/json"
  }
});

let user = null;
// получение данных профиля с сервера
api.getUserInfo()
  .then(userData => {
    user = userData.data;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      _id: userData._id,
    })
  })
  .catch(err => console.log(`ИИИИИРРРОР: ${err}`))

//получение карточек с сервера
api.getPlaceInfo()
  .then(res => {
    const Places = new Section({
      data: res,
      renderer: (data) => {
        Places.addItem(createCard(data));
      }
    }, '.places');
    Places.createItems(res);
  })
  .catch(err => console.log(`Упс, ошибочка ${err}`));

//экземпляр класса userInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

//экземпляр класса PopupWithForm для открытия попапа редактирования профиля
const editPopup = new PopupWithForm({
  popupSelector: '.popup-edit',
  submitHandler: (data) => {
    api.editProfileInfo(data)
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, about: data.about, _id: data._id });
      })
      .catch(err => { console.log(`${err}`) })

    editPopup.close();
  }
});
editPopup.setEventListeners();

editButton.addEventListener('click', () => {
  editPopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputDescription.value = currentUserInfo.about;
  editFormValidation.toggleButtonState();
});

//сабмит добавления новой карточки
const addPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  submitHandler: (data) => {
    api.addNewCard(data)
      .then(data => {
        defaultPlaces.addItem(createCard({ name: data.name, link: data.link, owner: data.owner, _id: data._id }));
      })
      .catch(err => console.log(`ошибочка ${err}`));
  }
});
addPopup.setEventListeners();

//слушатель на клик формы добавления карточки
addButton.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.toggleButtonState();
});



let userId = null;
// console.log(userId);
// userId = userInfo.getUserId();
// console.log(userId);

//рендеринг карточки на страницу
function createCard(item) {
  const place = new Card({
    name: item.name,
    link: item.link,
    owner: item.owner,
    _id: item._id
  }, //placeData
    item.owner._id, //ownerId
    userId = userInfo.getUserId(), //myId
    '#place-card', //cardSelector
    openFullImage, //handleCardClick
    () => { //handleDeleteCardIcon
      console.log(userId);
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(place.getId())
          .then(() => place.deleteCard())
          .then(() => { confirmPopup.close() })
          .catch(err => console.log(`не удалилось из-за ${err}`))
      })
    }
  );
  const placeElement = place.generateCard();
  return placeElement;
}

//создание карточек из массива
const defaultPlaces = new Section({
  data: initialPlaces,
  renderer: (data) => {
    defaultPlaces.addItem(createCard(data));
  }
}, '.places');

const confirmPopup = new PopupWithConfirm({
  popupSelector: '.popup-confirm'
})
confirmPopup.setEventListeners();


//попап изменения фото профиля

//const edu = new PopupWithForm({
//popupSelector: '.popup-avatar',
//submitHandler: (futureValues) => {
//
//}
//})