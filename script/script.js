let page = document.querySelector('.page');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let name = document.querySelector('.profile__name');
let inputName = document.querySelector('#input-name');
let description = document.querySelector('.profile__description');
let inputDescription = document.querySelector('#input-description');

function showEditForm() {
  popup.classList.add('popup_opened');
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
}
editButton.addEventListener('click', showEditForm);

let closeButton = document.querySelector('.popup__close-button');
function closeEditForm() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closeEditForm);

let editForm = document.querySelector('.edit-form');
function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closeEditForm();
}
editForm.addEventListener('submit', formSubmitHandler);