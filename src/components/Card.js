
export class Card {
    constructor(placeData, cardSelector, handleCardClick) {
        this._link = placeData.link;
        this._name = placeData.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const placeElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return placeElement;
    }

    _setEventListeners() {
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
            this._toggleLike();
        });
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _toggleLike() {
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
    }

    _deleteCard() {
        const targetPlace = this._element.closest('.place');
        targetPlace.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.place__image').src = this._link;
        this._element.querySelector('.place__image').alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}