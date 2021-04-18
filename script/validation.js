const validationConfig = {
    popupForm: '.popup-form',
    popupInput: '.popup-form__information',
    popupInputError: 'popup-form__information_error',
    submitButton: '.popup__button',
    submitButtonValid: 'popup__button_valid'
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
//функция валидации формы
function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.popupForm));
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
      setEventListeners(form, config);
  });
}
// Тут ставишь слушатели на конкретную форму.
// Обрати внимание - сколько аргументов передали в функцию 
//(парой строк выше), **ровно столько же** должно быть объявлено при её инициализации.
function setEventListeners(form, config) {
    form.addEventListener('input', () => {
    validateInput(form, config.popupForm);
    highlightFieldError(form, config.popupInput);
    toggleButtonState(form, config.popupInput);
  });
 }

 enableValidation(validationConfig);











