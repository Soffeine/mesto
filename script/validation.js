const validationConfig = {
    popupForm: '.popup-form',
    popupInput: '.popup-form__information',
    popupInputError: 'popup-form__information_error',
    submitButton: '.popup__button',
    submitButtonValid: 'popup__button_valid',
    inputError: '.popup__error-message'
}

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

function validateInput (input) {
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

//функция валидации формы
function enableValidation(config) {
  const getFormList = Array.from(document.querySelectorAll(validationConfig.popupForm));
  getFormList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  validateInput (formElement, validationConfig.popupInput, config);
  toggleButtonState (formElement, validationConfig.popupForm, config);
  highlightFieldError (formElement, validationConfig.popupInput, config);
});
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
editForm.addEventListener('input', function (evt) {
    enableValidation(validationConfig);
});

//сабмит инпутов формы редактирования профиля
addForm.addEventListener('input', function (evt) {
    enableValidation(validationConfig);
});