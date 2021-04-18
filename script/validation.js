const validationConfig = {
    popupAdd: '.popup-add',
    popupEdit: '.popup-edit',
    popupInput: '.popup-form__information',
    popupInputError: 'popup-form__information_error',
    submitButton: '.popup__button',
    submitButtonValid: 'popup__button_valid',
    inputError: '.popup__error-message'
}

const addValidation = document.querySelector(validationConfig.popupAdd);
const editValidation = document.querySelector(validationConfig.popupEdit);

// Функция для копирования текста ошибки из свойства поля ввода в span под ним.
function highlightFieldError(field) {
  const errorSpan = field.nextElementSibling;
    errorSpan.textContent = field.validationMessage;
}

// микро-функция показа ошибки
function showError(input) {
  input.classList.add(validationConfig.popupInputError);
}

//микро-функция скрытия ошибки
function hideError(input) {
  input.classList.remove(validationConfig.popupInputError);
}

//функция валидации формы
function enableValidation(input) {
  const validity = input.validity;
  const isValid = input.checkValidity();
  if (validity.tooShort || validity.tooLong) { 
    showError(input, validationConfig.popupInput);
} else if (validity.typeMismatch && input.type === 'url') {
    showError(input, validationConfig.popupInput);
} else if (isValid) {
    hideError(input, validationConfig.popupInput); 
}
}

//функция изменения кнопки
function toggleButtonState(form) {
    const button = form.querySelector(validationConfig.submitButton);
    const isValid = form.checkValidity();
    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.add(validationConfig.submitButtonValid);
    } else {
        button.setAttribute('disabled', true);
        button.classList.remove(validationConfig.submitButtonValid);
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
    const input = evt.target;
    enableValidation(input);
    toggleButtonState(editForm);
    highlightFieldError(input);
});