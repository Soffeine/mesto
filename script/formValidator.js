export class FormValidator {
    constructor(config) {
      this._config = config;
    }
    
    // копированиe текста ошибки из свойства поля ввода в span под ним.
    _highlightFieldError(field) {
      const errorSpan = field.nextElementSibling;
       errorSpan.textContent = field.validationMessage;
    }
  
    // показ ошибки
    _showError(input, config) {
      input.classList.add(config.popupInputError);
    }
  
    //скрытиe ошибки
    _hideError(input, config) {
      input.classList.remove(config.popupInputError);
    }
  
  
    //проверка полей на валидность
    _validateInput (input) {
        const validity = input.validity;
        const isValid = input.checkValidity();
        if (validity.tooShort || validity.tooLong) { 
          this._showError(input, this._config);
      }   else if (validity.typeMismatch && input.type === 'url') {
          this._showError(input, this._config);
      } else if (isValid) {
          this._hideError(input, this._config); 
      }
    }
  
    //изменения кнопки
    _toggleButtonState(form) {
      const button = form.querySelector(this._config.submitButton);
      const isValid = form.checkValidity();
        if (isValid) {
          button.removeAttribute('disabled');
          button.classList.add(this._config.submitButtonValid);
        }   else {
            button.setAttribute('disabled', true);
            button.classList.remove(this._config.submitButtonValid);
          }
    }
  
    _setEventListeners(form, config) {
      form.addEventListener('input', (evt) => {
      const input = evt.target;
      this._validateInput(input, this._config);
      this._highlightFieldError(input, this._config);
      this._toggleButtonState(form, this._config);
    });
   }
  
    //функция валидации формы
    enableValidation(config) {
      const forms = Array.from(document.querySelectorAll(this._config.popupForm));
      forms.forEach((form) => {
          form.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
  
        this._setEventListeners(form, config);
    });
  }
}