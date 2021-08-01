
export class Card {
    constructor(placeData, ownerId, myId, cardSelector, handleCardClick, handleDeleteIocnClick, api) {
        this._link = placeData.link;
        this._name = placeData.name;
        this._ownerId = placeData.owner._id;
        this._id = placeData._id;
        this._likes = placeData.likes;
        this._myId = myId;
        this._ownerId = placeData.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIocnClick;
        this.getId = this.getId.bind(this);
        this._isLiked = false;
        this._api = api;
        this._handleLikeClick = this._handleLikeClick.bind(this);
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
        this._element.querySelector('.place__image').src = this._link;
        this._element.querySelector('.place__image').alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;
        this._likeButton = this._element.querySelector('.place__like-button');
        this._likeCounter = this._element.querySelector('.place__like-counter');
        this._likeCounter.textContent = `${this._likes.length}`;
        if (this._ownerId === this._myId) {
            this._element.querySelector('.place__delete-button').removeAttribute('hidden')
        }
        this._setEventListeners();
        this._checkIsLiked();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.place__delete-button')
            .addEventListener('click', this._handleDeleteIconClick);

        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick()
        })
        this._element.querySelector('.place__image')
            .addEventListener('click', () => {
                this._handleCardClick(this._name, this._link);
            });
    }

    _handleLikeClick() {
            if(this._likeButton.classList.contains('place__like-button_active')) {
                this._api.deleteLike(this.getId())
                .then(this._removeLike())
                .then(this._decrementCounter())
            } else {
                this._api.putLike(this.getId())
                .then(this._setLike())
                .then(this._incrementCounter())
            }
        
    }
    
    _setLike() {
        this._element.querySelector('.place__like-button').classList.add('place__like-button_active');
    }

    _removeLike() {
        this._element.querySelector('.place__like-button').classList.remove('place__like-button_active');
    }

    _changeLikeNumber() {
        if (this._likeButton.classList.contains('place__like-button_active')) {
            this._incrementCounter()
        } else {
            this._decrementCounter()
        }
    }
    
    _incrementCounter(){
     this._likeCounter.textContent = `${Number(this._likeCounter.textContent) + 1}`
    }

    _decrementCounter() {
        this._likeCounter.textContent = `${Number(this._likeCounter.textContent) - 1}`
    }

    _checkIsLiked() {
        this._isLiked = this._likes.some(item => item._id === this._myId);   
    }

    deleteCard() {
        const targetPlace = this._element.closest('.place');
        targetPlace.remove();
    }

    getId() {
        return this._id;
    }
}


