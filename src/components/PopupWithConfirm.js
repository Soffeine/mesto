import { Popup } from './Popup.js';

//  класс подтверждения удаления карточки
export class PopupWithConfirm extends Popup {
    constructor({popupSelector}) {
        super(popupSelector);
    }
    
    setSubmitAction(action) {
        this._submitHandler = action;
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.popup-form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler();
        });
        super.setEventListeners();
    }
}