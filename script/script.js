let page = document.querySelector('.page');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.close-button');
let submitButton = document.querySelector('.edit-form__save-button')

function showEditForm() {
  popup.classList.add('popup__opened');
  let name = document.querySelector('#name');
  let inputName = document.querySelector('#input-name');
  inputName.value = name.textContent;
  let description = document.querySelector('#description');
  let inputDescription = document.querySelector('#input-description');
  inputDescription.value = description.textContent;
}
editButton.addEventListener('click', showEditForm);

function closeEditForm() {
   popup.classList.remove('popup__opened');
}
closeButton.addEventListener('click', closeEditForm);

let editForm = document.querySelector('.edit-form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let name = document.querySelector('#name');
    let inputName = document.querySelector('#input-name');
    name.textContent = inputName.value;
    let description = document.querySelector('#description');
    let inputDescription = document.querySelector('#input-description');
    description.textContent = inputDescription.value;
  closeEditForm();
}
editForm.addEventListener('submit', formSubmitHandler);
editForm.addEventListener('submit', closeEditForm);