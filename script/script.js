const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupFullImage = document.querySelector('.popup-image');


const editForm = document.forms.editForm;
const inputName = editForm.elements.inputName;
const inputDescription = editForm.elements.inputDescription;

const addForm = document.forms.addForm;
const inputPlaceName = addForm.elements.inputPlaceName;
const inputPlaceImage = addForm.elements.inputPlaceImage;

const initialPlaces = [
  {
    name: 'Афины, Греция',
    link: './images/Athens.JPG',
  },
  {
    name: 'Стамбул, Турция',
    link: './images/Istanbul.JPG',
  },
  {
    name: 'Териберка, Россия',
    link: './images/teriberka.JPG',
  },
  {
    name: 'Пекин, Китай',
    link: './images/Beijing.JPG',
  },
  {
    name: 'Шанхай, Китай',
    link: './images/Shanghai.JPG',
  },
  {
    name: 'Сучжоу, Китай',
    link: './images/Suzhou.JPG',
  },
];

//функция открытия попапа
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEcs);
}

//функция закрытия попапа
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEcs);
}

//открыть попап редактирования профиля
editButton.addEventListener('click', function (evt) {
  inputName.value = profileNameElement.textContent;
  inputDescription.value = profileDescriptionElement.textContent;
  openPopup(popupEdit);
});

//открытие попапа добавления карточки
addButton.addEventListener('click', () => {
  openPopup(popupAdd); 
  toggleButtonState(addForm);
});

const picture = document.querySelector('.popup-image__picture');
const caption = document.querySelector('.popup-image__caption');

//функция открытия полного изображения
function showFullImage(name, link) {
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
function closePopupEcs (evt) {
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
function closePopupOverlay (evt) {
  if(evt.target.classList.contains('popup')) {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}


//сабмит редактирования профиля
editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputDescription.value;
  closePopup(popupEdit);
});

// Элемент, куда будем вставлять карточки.
const places = document.querySelector('.places');
const cardTemplate = document.querySelector('#place-card').content;
const closePopupImageButton = document.querySelector('.popup__close-button');

//функция удаления публикации
function deletePlace(evt) {
  const target = evt.target;
  const targetPlace = target.closest('.place');
  targetPlace.remove();
}

//функция лайканья 
function toggleLike(evt) {
  const target = evt.target;
  target.classList.toggle('place__like-button_active');
}

//создание карточки на странице
function createPlace(element) {
  const placeElement = cardTemplate.cloneNode(true);
  placeElement.querySelector('.place__title').textContent = element.name;
  placeElement.querySelector('.place__image').alt = element.name;
  placeElement.querySelector('.place__image').src = element.link;
  placeElement.querySelector('.place__like-button').addEventListener('click', toggleLike);
  placeElement.querySelector('.place__image').addEventListener('click', showFullImage);
  placeElement.querySelector('.place__delete-button').addEventListener('click', deletePlace);
  placeElement.querySelector('.place__image').addEventListener('click', () => showFullImage(element.name, element.link));

  return placeElement;
} 

//метод форыч, вот чтоб все карточки вели себя правильно
initialPlaces.forEach(function (element) {
  const placeElement = createPlace(element);
  places.append(placeElement);
});

//сабмит добавления нового фото
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = inputPlaceName.value;
  const imageLink = inputPlaceImage.value
  const cardData = {
    name: name,
    link: imageLink
  };
  const newPlace = createPlace(cardData);
  places.prepend(newPlace);
  closePopup(popupAdd);
  addForm.reset();
});




