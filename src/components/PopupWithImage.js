import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        const popupImage = this._popup.querySelector('.popup-image__picture');
        popupImage.src = link;
        popupImage.alt = name;
        this._popup.querySelector('.popup-image__caption').textContent = name;
        super.open();
    }
}