
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
}
handleFullImagePopup.setEventListeners();

let user = null;
let userId = null;

//рендеринг карточки на страницу
function createCard(item) {
  const place = new Card({
    name: item.name,
    link: item.link,
    owner: item.owner,
    _id: item._id
  }, //placeData
    userId, //myId
    '#place-card', //cardSelector
    openFullImage, //handleCardClick
    () => { //handleDeleteCardIcon
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(place.getId())
          .then(() => { userId = userData._id })
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

//сабмит добавления новой карточки
const addPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  submitHandler: (data) => {
    api.addNewCard(data)
      .then(data => {
        defaultPlaces.addItem(createCard({ name: data.name, link: data.link }));
      })
      .catch(err => console.log(`ошибочка ${err}`))
  }
});

//попап изменения фото профиля
// const editAvatarPopup = new PopupWithForm({
//   popupSelector: '.popup-avatar',
//   submitHandler: (data) => {

//   }
// })


//слушатель на клик формы добавления карточки
addButton.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.toggleButtonState();
});
addPopup.setEventListeners();



const confirmPopup = new PopupWithConfirm({
  popupSelector: '.popup-confirm'
})
confirmPopup.setEventListeners()

const editPopup = new PopupWithForm({
  popupSelector: '.popup-edit',
  submitHandler: (data) => {
    api.editProfileInfo(data)
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, about: data.about });
      })
      .catch(err => { console.log(`ничего не изменилось ${err}`) })

    editPopup.close();
  }
});

editButton.addEventListener('click', () => {
  editPopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputDescription.value = currentUserInfo.about;
  editFormValidation.toggleButtonState();
});
editPopup.setEventListeners();

// работа с api

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: "7f564866-b8ba-4557-8c91-b7d4f8327f3b",
    "Content-Type": "application/json"
  }
});

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


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});


// получение данных профиля с сервера
api.getUserInfo()
  .then(userData => {
    user = userData.data;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      userAvatar: userData.avatar,
      userID: userData._id,
    })
  })
  .catch(err => console.log(`ИИИИИРРРОР: ${err}`))