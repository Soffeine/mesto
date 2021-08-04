
export class Card {
    constructor(placeData, ownerId, myId, cardSelector, handleCardClick, handleDeleteIocnClick, handleLikeAction) {
        this._link = placeData.link;
        this._name = placeData.name;
        this._ownerId = placeData.owner._id;
        this._id = placeData._id;
        this._likes = placeData.likes;
        this._myId = myId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIocnClick;
        this.getId = this.getId.bind(this);
        this._checkIsLiked = this._checkIsLiked.bind(this);
        this._isLiked = false;
        this._handleLikeAction = handleLikeAction;
    }


    _setEventListeners() {
        this._element.querySelector('.place__delete-button')
            .addEventListener('click', this._handleDeleteIconClick);

        this._likeButton.addEventListener('click', () => {
            this._handleLikeAction()
        })
        this._image.addEventListener('click', () => {
                this._handleCardClick(this._name, this._link);
            });
    }

    setLike() {
        this._element.querySelector('.place__like-button').classList.add('place__like-button_active');
        this._incrementCounter();
    }

    _incrementCounter() {
        this._likeCounter.textContent = `${Number(this._likeCounter.textContent) + 1}`
    }

    removeLike() {
        this._element.querySelector('.place__like-button').classList.remove('place__like-button_active');
        this._decrementCounter()
    }

    _decrementCounter() {
        this._likeCounter.textContent = `${Number(this._likeCounter.textContent) - 1}`
    }

    _likeStatus () {
        if (this._checkIsLiked()) {
            this.setLike();
        } 
    }

    likeIsActive () {
     return this._likeButton.classList.contains('place__like-button_active') 
    }


    _checkIsLiked() {
       return this._isLiked = this._likes.some(item => item._id === this._myId);
    }

    _getTemplate() {
        const placeElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return placeElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.place__image')
        this._likeButton = this._element.querySelector('.place__like-button');
        this._likeCounter = this._element.querySelector('.place__like-counter');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;
        this._likeCounter.textContent = `${this._likes.length}`;
        if (this._ownerId === this._myId) {
            this._element.querySelector('.place__delete-button').removeAttribute('hidden')
        }
        this._setEventListeners();
        this._likeStatus();
        return this._element;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    getId() {
        return this._id;
    }
}