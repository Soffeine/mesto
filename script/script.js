const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const name = document.querySelector('.profile__name');
const inputName = document.querySelector('#input-name');
const description = document.querySelector('.profile__description');
const inputDescription = document.querySelector('#input-description');

const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');

function openPopup (item) {
  popup.classList.add('popup_opened');
}

function closePopup (item) {
  popup.classList.remove('popup_opened');
}

const closeButton = document.querySelectorAll('.popup__close-button');

editButton.addEventListener('click', function (evt) {
  openPopup(popupEdit);
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
});

const editForm = document.querySelector('#popup-edit-form');
editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  popupEdit.classList.remove('popup_opened');
});

addButton.addEventListener('click', openPopup(popupAdd));

const initialPlaces = [
  {
    name: 'Афины, Греция',
    link: (src = './images/Athens.JPG'),
  },
  {
    name: 'Стамбул, Турция',
    link: (src = './images/Istanbul.JPG'),
  },
  {
    name: 'Териберка, Россия',
    link: (src = './images/teriberka.JPG'),
  },
  {
    name: 'Пекин, Китай',
    link: (src = './images/Beijing.JPG'),
  },
  {
    name: 'Шанхай, Китай',
    link: (src = './images/Shanghai.JPG'),
  },
  {
    name: 'Сучжоу, Китай',
    link: (src = './images/Suzhou.JPG'),
  },
];

const places = document.querySelector('.places');
const cardTemplate = document.querySelector('#place-card').content;
const popupFullImage = document.querySelector('.popup-image');
const closePopupImageButton = document.querySelector('.popup__close-button');


function deletePlace(evt) {
  const target = evt.target;
  const targetPlace = target.closest('.place');
  targetPlace.remove();
}

function toggleLike(evt) {
  const target = evt.target;
  target.classList.toggle('place__like-button_active');
}

function showFullImage(evt) {
  popupFullImage.classList.add('popup_opened');
  const parent = evt.target.closest('.place');
  const titleElement = parent.querySelector('.place__title');
  let picture = document.querySelector('.popup-image__picture');
  let caption = document.querySelector('.popup-image__caption');
  picture.src = evt.target.src;
  caption.textContent = titleElement.textContent;
}
//check this
closePopupImageButton.addEventListener('click', function (evt) {
  popupFullImage.classList.remove('popup_opened'); 
});

initialPlaces.forEach(function (element) {
  const placeElement = cardTemplate.cloneNode(true);
  placeElement.querySelector('.place__title').textContent = element.name;
  placeElement.querySelector('.place__image').src = element.link;
  placeElement.querySelector('.place__like-button').addEventListener('click', toggleLike);
  placeElement.querySelector('.place__image').addEventListener('click', showFullImage);
  placeElement.querySelector('.place__delete-button').addEventListener('click', deletePlace);

  places.append(placeElement);
});

const inputPlaceName = document.querySelector(
  '.popup-form__information_input_place-name'
);
const inputPlaceImage = document.querySelector(
  '.popup-form__information_input_link-image'
);
const addForm = document.querySelector('#popup-add-form');
addForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newPlace = cardTemplate.cloneNode(true);
  const newPlaceName = newPlace.querySelector('.place__title');
  const newPlaceImage = newPlace.querySelector('.place__image');
  newPlaceName.textContent = inputPlaceName.value;
  newPlaceImage.src = inputPlaceImage.value;

  newPlace.querySelector('.place__like-button').addEventListener('click', toggleLike);
  newPlace.querySelector('.place__delete-button').addEventListener('click', deletePlace);
  newPlace.querySelector('.place__image').addEventListener("click", showFullImage);

  places.prepend(newPlace);
  popupAdd.classList.remove('popup-add_opened');
});