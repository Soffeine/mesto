import { Popup } from './Popup.js';

//  класс подтверждения удаления карточки
export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners() {
        super(this.setEventListeners);
        // навесить слушателя на сабмит удаления карточки
        }
}