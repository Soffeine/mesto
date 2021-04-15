const validationConfig = {
    popupAdd: '.popup-add',
    popupEdit: '.popup-edit',
    popupInput: '.popup-form__information',
    submitButton: '.popup__button',
    submitButtonInvalid: '.popup__save-button_invalid',
    submitButtonValid: '.popup__save-button_valid',
    inputError: '.popup__error-message',
    inputError: '.popup__error-message_active'
  }


  const editForm = document.forms.editForm;
  const inputName = editForm.elements.inputName;
  const inputDescription = editForm.elements.inputDescription;
  
  const addForm = document.forms.addForm;
  const inputPlaceName = addForm.elements.inputPlaceName;
  const inputPlaceImage = addForm.elements.inputPlaceImage;


  // Функция для копирования текста ошибки из свойства поля ввода в span под ним.
  function highlightFieldError(field) {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = field.validationMessage;
  }
  
  //функция показа ошибки
  function showError(input) {
    const validity = input.validity;
    if(validity.tooShort || validity.tooLong) {
      input.classList.add('popup-form__information_error');
      highlightFieldError;
    } else if (validity.typeMismatch && input.type === 'url') {
      highlightFieldError;
      input.classList.add('popup-form__information_error');
    } else if (input.validity.valid) {
      input.classList.remove('popup-form__information_error');
    }
  }
  
  //функция изменения кнопки
  function toggleButtonState(form) {
    const button = form.querySelector(validationConfig.submitButton);
    if (form.checkValidity()) {
      button.removeAttribute('disabled');
      button.classList.add('popup__save-button_valid');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('popup__save-button_valid');
    }
  }
  
  // caбмит инпутов формы добавления карточки
  popupAdd.addEventListener('input', function (evt){
    const input = evt.target;
    const form = evt.currentTarget;
    highlightFieldError(input);
    showError(input);
    toggleButtonState(popupAdd);
  });
  
  //сабмит инпутов формы редактирования профиля
  editForm.addEventListener('input', function (evt){
    const input = evt.target;
    const form = evt.currentTarget;
    highlightFieldError(input);
    showError(input);
    toggleButtonState(editForm);
  })