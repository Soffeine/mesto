export class FormValidator {
    constructor(form, config) {
        this._form = form;
        this._config = config;
        this._submitButton = this._form.querySelector(this._config.submitButton);
    }

    // копированиe текста ошибки из свойства поля ввода в span под ним.
    _highlightFieldError(field) {
        const errorSpan = field.nextElementSibling;
        errorSpan.textContent = field.validationMessage;
    }

    // показ ошибки
    _showError(input, config) {
        input.classList.add(this._config.popupInputError);
    }

    //скрытиe ошибки
    _hideError(input, config) {
        input.classList.remove(this._config.popupInputError);
    }


    //проверка полей на валидность
    _validateInput(input) {
        const validity = input.validity;
        const isValid = input.checkValidity();
        if (validity.tooShort || validity.tooLong || validity.typeMismatch && input.type === 'url') {
            this._showError(input, this._config);
        } else if (isValid) {
            this._hideError(input, this._config);
        }
    }

    //изменения кнопки
    toggleButtonState() {
        const isValid = this._form.checkValidity();
        if (isValid) {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.add(this._config.submitButtonValid);
        } else {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.remove(this._config.submitButtonValid);
        }
    }

    _setEventListeners(form, config) {
        this._form.addEventListener('input', (evt) => {
            const input = evt.target;
            this._validateInput(input);
            this._highlightFieldError(input, this._config);
            this.toggleButtonState();
        });
    }

    //функция валидации формы
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._form, this._config);
    };
}