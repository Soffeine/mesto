const validationConfig = {
    popupAdd: '.popup-add',
    popupEdit: '.popup-edit',
    popupInput: '.popup-form__information',
    submitButton: '.popup__button',
    submitButtonInvalid: '.popup__save-button_invalid',
    submitButtonValid: '.popup__save-button_valid',
    inputError: '.popup__error-message'
}

const addValidation = document.querySelector(validationConfig.popupAdd);
const editValidation = document.querySelector(validationConfig.popupEdit);

// Функция для копирования текста ошибки из свойства поля ввода в span под ним.
function highlightFieldError(field) {
  const errorSpan = field.nextElementSibling;
    errorSpan.textContent = field.validationMessage;
}

//функция показа ошибки
//function showError(input) {
  //  const validity = input.validity;
 // const isValid = input.checkValidity();
  //if (validity.tooShort || validity.tooLong) {
    //  input.classList.add('popup-form__information_error');
    // highlightFieldError;
  //} else if (validity.typeMismatch && input.type === 'url') {
    //  highlightFieldError;
      //input.classList.add('popup-form__information_error');
 // } else if (isValid) {
   ///   input.classList.remove('popup-form__information_error');
  //}
//}

// микро-функция показа ошибки
function showError(input) {
  input.classList.add('popup-form__information_error');
}

//микро-функция скрытия ошибки
function hideError(input) {
  input.classList.remove('popup-form__information_error');
}

//функция валидации формы
function enableValidation(input) {
  const validity = input.validity;
  const isValid = input.checkValidity();
  if (validity.tooShort || validity.tooLong) { 
    showError(input);
} else if (validity.typeMismatch && input.type === 'url') {
    showError(input);
} else if (isValid) {
    hideError(input); 
}
}

//функция изменения кнопки
function toggleButtonState(form) {
    const button = form.querySelector(validationConfig.submitButton);
    const isValid = form.checkValidity();
    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.add('popup__button_valid');
    } else {
        button.setAttribute('disabled', true);
        button.classList.remove('popup__button_valid');
    }
}

// caбмит инпутов формы добавления карточки
addValidation.addEventListener('input', function (evt) {
    const input = evt.target;
    enableValidation(input);
    toggleButtonState(addForm);
    highlightFieldError(input);
});

//сабмит инпутов формы редактирования профиля
editValidation.addEventListener('input', function (evt) {
    const input = evt.target.classList.contains(validationConfig.popupInput);
    enableValidation(input);
    toggleButtonState(editForm);
    highlightFieldError(input);
});