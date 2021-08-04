import { Popup } from './Popup.js';
import {LoadStatus} from "../utils/constants";

export class PopupWithForm extends Popup {
    constructor({popupSelector, submitHandler}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
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
            
            const submitButton = evt.target.querySelector(`.popup__button`);

            window.addEventListener(LoadStatus.FETCHING, () => {
                submitButton.textContent = `Сохранение...`
            });
            window.addEventListener(LoadStatus.SUCCESSFUL, () => {
                submitButton.textContent = `Сохранить`;
            });
        }); 
    }

    close() {
        super.close();
        this._form.reset();
    }
}
