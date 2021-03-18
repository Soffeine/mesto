let page = document.querySelector('.page');
let popupEdit = document.querySelector('.popup-edit');
let editButton = document.querySelector('.profile__edit-button');
let name = document.querySelector('.profile__name');
let inputName = document.querySelector('#input-name');
let description = document.querySelector('.profile__description');
let inputDescription = document.querySelector('#input-description');


editButton.addEventListener('click', function (evt){
  popupEdit.classList.add('popup-edit_opened');
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
});

let closeEditForm = document.querySelector('.popup-edit__close-button');
closeEditForm.addEventListener('click', function closeEditForm(evt){
  popupEdit.classList.remove('popup-edit_opened');
});

let editForm = document.querySelector('#popup-edit-form');
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  popupEdit.classList.remove('popup-edit_opened');
});

let addButton = document.querySelector('.profile__add-button');
let popupAdd = document.querySelector('.popup-add');
let placeName = document.querySelector('#input-place');
let placeImage = document.querySelector('#input-image');
let closeAddform = document.querySelector('.popup-add__close-button')
addButton.addEventListener('click', function(evt){
  popupAdd.classList.add('popup-add_opened');
});

closeAddform.addEventListener('click', function(evt){
  popupAdd.classList.remove('popup-add_opened');
});

const initialPlaces = [
  {
    name: 'Афины, Греция',
    link: src = './images/Athens.JPG'
  },
  {
    name: 'Стамбул, Турция',
    link: src = './images/Istanbul.JPG'
  },
  {
    name: 'Териберка, Россия',
    link: src = './images/teriberka.JPG'
  },
  {
    name: 'Пекин, Китай',
    link: src = './images/Beijing.JPG'
  },
  {
    name: 'Шанхай, Китай',
    link: src = './images/Shanghai.JPG'
  },
  {
    name: 'Сучжоу, Китай',
    link: src = './images/Suzhou.JPG'
  }
];
const places = document.querySelector('.places');
const cardTemplate = document.querySelector('#place-card').content;
const popupFullImage = document.querySelector('.popup-image');
const closePopupImageButton = document.querySelector('.popup-image__close-button');

initialPlaces.forEach(function(element){
  const placeElement = cardTemplate.cloneNode(true);
  placeElement.querySelector('.place__title').textContent = element.name;
  placeElement.querySelector('.place__image').src = element.link;
  placeElement.querySelector('.place__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('place__like-button_active');
  });
  placeElement.querySelector('.place__delete-button').addEventListener('click', function(evt){
    evt.target.closest('.place').remove();
  });
  placeElement.querySelector('.place__image').addEventListener('click', function(evt){
    popupFullImage.classList.add('popup-image_opened');
    let picture = document.querySelector('.popup-image__picture');
    let caption = document.querySelector('.popup-image__caption');
    picture.src = evt.target.src;
    caption.textContent = evt.target.textContent /* !!!!! */
    closePopupImageButton.addEventListener('click', function(){
      popupFullImage.classList.remove('popup-image_opened');
    });
  });

  places.append(placeElement);
});
/*
let addForm = document.querySelector('#popup-add-form');
let addCaption = document.querySelector('#input-place');
let addPicture = document.querySelector('#input-image');

function addNewPlace(name, link){
  const newPlaceElement = cardTemplate.cloneNode(true);
	const caption = newPlaceElement.querySelector('.place__title');
	caption.textContent = newPlaceElement.name;
  const picture = newPlaceElement.querySelector('.place__image');
  picture = newPlaceElement.link;
	return newPlaceElement;
}

function addTaskFormListener(evt) {
	evt.preventDefault();
	const input = todoForm.querySelector('.todo__input');
	const inputTitle = input.value;

	const newTask = createTaskDomNode({ title: inputTitle });

	addTaskListeners(newTask);

	container.prepend(newTask);

	input.value = '';
}

  









function createTaskDomNode(item){
	const newItem = templateElement.content.cloneNode(true);
	const title = newItem.querySelector('.task__name');
	title.textContent = item.title;

	return newItem;
}

function renderList() {
	const result = TODO_LIST.map(function(item) {
		const newTask = createTaskDomNode(item);
		addTaskListeners(newTask);
		return newTask;
	});

	container.append(...result);
}

function addTaskFormListener(evt) {
	evt.preventDefault();
	const input = todoForm.querySelector('.todo__input');
	const inputTitle = input.value;

	const newTask = createTaskDomNode({ title: inputTitle });

	addTaskListeners(newTask);

	container.prepend(newTask);

	input.value = '';
}

renderList();
todoForm.addEventListener('submit', addTaskFormListener);

*/