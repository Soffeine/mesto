
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
  addForm,
  editForm,
  inputName,
  inputDescription,
  validationConfig,
  avatarForm,
  editAvatar,
  LoadStatus
} from '../utils/constants.js';
import './index.css';


//экземпляр класса FormValidator для валидации формы добавления карточки
const addFormValidation = new FormValidator(addForm, validationConfig);
addFormValidation.enableValidation();

//экземпляр класса FormValidator для валидации формы редактирования профиля
const editFormValidation = new FormValidator(editForm, validationConfig);
editFormValidation.enableValidation();

//экземпляр класса FormValidator для валидации формы редактирования фото профиля
const avatarFormValidation = new FormValidator(avatarForm, validationConfig);
avatarFormValidation.enableValidation();

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

//экземпляр класса userInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  photoSelector: '.profile__photo'
});

// экземпляр  класса Section
const places = new Section({
  renderer: (data) => {
    places.addItem(createCard({ name: data.name, link: data.link, owner: data.owner, _id: data._id, likes: data.likes }, data.owner._id, userId));
  }
}, '.places');

let userId = null;

Promise.all([api.getUserInfo(), api.getPlaceInfo()])
  .then(([userData, res]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      _id: userData._id,
    });
    places.createItems(res);
  })
  .catch(err => console.log(`Упс, ошибочка ${err}`));

const isLoadingEvent = (type) => {
  window.dispatchEvent(new CustomEvent(type));
};
//экземпляр класса PopupWithForm для открытия попапа редактирования профиля
const editPopup = new PopupWithForm({
  popupSelector: '.popup-edit',
  submitHandler: (data) => {
    isLoadingEvent(LoadStatus.FETCHING)
    api.editProfileInfo(data)
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, about: data.about, _id: data._id });
        isLoadingEvent(LoadStatus.SUCCESSFUL);
      })
      .catch(err => {console.log(`${err}`);})
  },
  status
});
editPopup.setEventListeners();
//слушатель на клик формы редактирования профиля
editButton.addEventListener('click', () => {
  editPopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputDescription.value = currentUserInfo.about;
  editFormValidation.toggleButtonState();
});


//попап изменения фото профиля
const avatarPopup = new PopupWithForm({
  popupSelector: '.popup-avatar',
  submitHandler: (data) => {
    isLoadingEvent(LoadStatus.FETCHING)
    api.editAvatar(data)
      .then(data => {
        userInfo.changeUserPhoto({ avatar: data.avatar });
        isLoadingEvent(LoadStatus.SUCCESSFUL);
      })
      .catch(err => { console.log(`${err}`) })
  }
})
avatarPopup.setEventListeners();

editAvatar.addEventListener('click', () => {
  avatarPopup.open();
  avatarFormValidation.toggleButtonState();
})

//сабмит добавления новой карточки
const addPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  submitHandler: (data) => {
    isLoadingEvent(LoadStatus.FETCHING)
    api.addNewCard(data)
      .then(data => {
        isLoadingEvent(LoadStatus.SUCCESSFUL);
        places.addItem(createCard({ 
          name: data.name, 
          link: data.link, 
          owner: data.owner, 
          _id: data._id, 
          likes: data.likes 
        }, 
          data.owner._id, 
          userId));
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


//рендеринг карточки на страницу
function createCard(item) {
  const place = new Card({
    name: item.name,
    link: item.link,
    owner: item.owner,
    _id: item._id,
    likes: item.likes
  }, //placeData
    item.owner._id, //ownerId
    userId, //myId
    '#place-card', //cardSelector
    openFullImage, //handleCardClick
    () => { //handleDeleteCardIcon
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(place.getId())
          .then(() => place.deleteCard())
          .then(() => { confirmPopup.close() })
          .catch(err => console.log(`не удалилось из-за ${err}`))
      })
    },
    api //api
  );
  const placeElement = place.generateCard();
  return placeElement;
}

const confirmPopup = new PopupWithConfirm({
  popupSelector: '.popup-confirm'
});
confirmPopup.setEventListeners();

