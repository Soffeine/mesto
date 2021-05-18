import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        this._popup.querySelector('.popup-image__picture').src = link;
        this._popup.querySelector('.popup-image__picture').alt = name;
        this._popup.querySelector('.popup-image__caption').textContent = name;
        super.open();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
    }
}