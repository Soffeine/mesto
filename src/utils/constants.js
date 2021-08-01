//кнопки в разметке для вызова попапов
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editAvatar = document.querySelector('.profile__image_edit-photo-sign');


export const addForm = document.forms.addForm;  //ФОРМА добавления карточки
export const editForm = document.forms.editForm;  //ФОРМА редактирвания профиля
export const avatarForm = document.forms.avatarForm; //ФОРМА редактирования аватара

// поля для редактирования информации профиля
export const inputName = editForm.elements.name;
export const inputDescription = editForm.elements.about;

//объект валидации
export const validationConfig = {
  popupForm: '.popup-form',
  popupInput: '.popup-form__information',
  popupInputError: 'popup-form__information_error',
  submitButton: '.popup__button',
  submitButtonValid: 'popup__button_valid'
}

export const LoadStatus = {
  FETCHING: 'fetching',
  SUCCESSFUL: 'successful',
}