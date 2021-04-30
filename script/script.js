import { Card } from './cards.js';
import { FormValidator } from './formValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

//функция открытия попапа
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEcs);
}

//функция закрытия попапа
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEcs);
}


const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
export const popupFullImage = document.querySelector('.popup-image'); //попап
//открыть попап редактирования профиля
editButton.addEventListener('click', function (evt) {
  inputName.value = profileNameElement.textContent;
  inputDescription.value = profileDescriptionElement.textContent;
  openPopup(popupEdit);
});

// мой единственный не поломавший код (и самооценку) способ сделать так, чтоб кнопка вела себя прилично.
function buttonStateChanges(form, config) {
  const button = form.querySelector(config.submitButton);
        const isValid = form.checkValidity();
        if (isValid) {
            button.removeAttribute('disabled');
            button.classList.add(config.submitButtonValid);
        } else {
            button.setAttribute('disabled', true);
            button.classList.remove(config.submitButtonValid);
        }
}


const addForm = document.forms.addForm;
//открытие попапа добавления карточки
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  buttonStateChanges(addForm, validationConfig);
});


//функция открытия полного изображения
export function showFullImage(name, link) {
  picture.src = link;
  picture.alt = name;
  caption.textContent = name; 
  openPopup(popupFullImage);
}

//закрытие попапов
const closeEdit = document.querySelector('.popup-edit__close-button');
const closeAdd = document.querySelector('.popup-add__close-button');
const closeImage = document.querySelector('.popup-image__close-button');

closeEdit.addEventListener('click', () => closePopup(popupEdit));
closeImage.addEventListener('click', () => closePopup(popupFullImage));
closeAdd.addEventListener('click', () => {
  closePopup(popupAdd);
  addForm.reset();
});


//закрытие попапов через esc
function closePopupEcs(evt) {
  const escapeKey = 27;
  if (evt.keyCode === escapeKey) {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

// закрытие попапов через overlay
popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupFullImage.addEventListener('click', closePopupOverlay);
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

const editForm = document.forms.editForm;
const inputName = editForm.elements.inputName;
const inputDescription = editForm.elements.inputDescription;
//сабмит редактирования профиля
editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputDescription.value;
  closePopup(popupEdit);
});

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


const places = document.querySelector('.places'); //контейнер для переноса карточек
const picture = document.querySelector('.popup-image__picture'); //картинка попапа в разметке
const caption = document.querySelector('.popup-image__caption'); //подпись в попапе в разметке

function createCard(item) {
  const place = new Card(item, '#place-card');
  return place.generateCard();
}

initialPlaces.forEach(item => {
  const placeElement = createCard(item);
  places.append(placeElement);
});

const inputPlaceName = addForm.elements.inputPlaceName;
const inputPlaceImage = addForm.elements.inputPlaceImage;

//сабмит добавления нового места
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = inputPlaceName.value;
  const imageLink = inputPlaceImage.value;
  const cardData = {
    name: name,
    link: imageLink
  };

  const newPlace = createCard(cardData);
  places.prepend(newPlace);
  closePopup(popupAdd);
  addForm.reset();
});

const validationConfig = {
  popupForm: '.popup-form',
  popupInput: '.popup-form__information',
  popupInputError: 'popup-form__information_error',
  submitButton: '.popup__button',
  submitButtonValid: 'popup__button_valid'
}

new FormValidator(editForm, validationConfig).enableValidation();


new FormValidator(addForm, validationConfig).enableValidation();

