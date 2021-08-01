import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({popupSelector, submitHandler, status}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._status = status;
        console.log(this._status)
        }

    _getInputValues() {
        this._futureValues = {};
        const inputs = [...this._form.querySelectorAll('.popup-form__information')];
        inputs.forEach((input) => {
            this._futureValues[input.name] = input.value;
        });
        return this._futureValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.popup-form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        }); 
    }

    close() {
        super.close();
        this._form.reset();
    }
}
