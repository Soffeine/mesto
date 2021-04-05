const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const name = document.querySelector('.profile__name');
const inputName = document.querySelector('#input-name');
const description = document.querySelector('.profile__description');
const inputDescription = document.querySelector('#input-description');

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupFullImage = document.querySelector('.popup-image');

//функция открытия попапа
function openPopup (item) {
  item.classList.add('popup_opened');
}

//функция закрытия попапа
function closePopup (item) {
  item.classList.remove('popup_opened');
}

//открыть попап редактирования профиля
editButton.addEventListener('click', function (evt) {
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
  openPopup(popupEdit);
});

//открытие попапа добавления карточки
addButton.addEventListener('click', () => openPopup(popupAdd));

//функция открытия полного изображения
function showFullImage(evt) {
  const parent = evt.target.closest('.place');
  const titleElement = parent.querySelector('.place__title');
  const picture = document.querySelector('.popup-image__picture');
  const caption = document.querySelector('.popup-image__caption');
  picture.src = evt.target.src;
  caption.textContent = titleElement.textContent;
  openPopup(popupFullImage);
}

//закрытие попапов
const closeEdit = document.querySelector('.popup-edit__close-button');
const closeAdd = document.querySelector('.popup-add__close-button');
const closeImage = document.querySelector('.popup-image__close-button');

closeEdit.addEventListener('click', () => closePopup(popupEdit));
closeImage.addEventListener('click', () => closePopup(popupFullImage));
closeAdd.addEventListener('click', () => closePopup(popupAdd));

//сабмит редактирования профиля
const editForm = document.querySelector('#popup-edit-form');
editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup(popupEdit);
});


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
function createPlace(element) {
  const placeElement = cardTemplate.cloneNode(true);
  placeElement.querySelector('.place__title').textContent = element.name;
  placeElement.querySelector('.place__image').src = element.link;
  placeElement.querySelector('.place__like-button').addEventListener('click', toggleLike);
  placeElement.querySelector('.place__image').addEventListener('click', showFullImage);
  placeElement.querySelector('.place__delete-button').addEventListener('click', deletePlace);
  
  return placeElement;
}

initialPlaces.forEach(function (element) {
  const placeElement = createPlace(element);

  places.append(placeElement);
});

const inputPlaceName = document.querySelector(
'.popup-form__information_input_place-name'
);
const inputPlaceImage = document.querySelector(
  '.popup-form__information_input_link-image'
);
const addForm = document.querySelector('#popup-add-form');

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