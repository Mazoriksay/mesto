export default class Card {
  constructor(data, templateSelector, userId, handleCardClick, {handleDeleteCard, handleSetLike, handleUnsetLike}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleUnsetLike =  handleUnsetLike;
    this._handleDeleteCard = handleDeleteCard;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.list__card')
      .cloneNode(true);
    
    return cardElement;
  }
  
  _toggleLike() {
    if (!this._likeButton.classList.contains('list__like_active')) {
      this._handleSetLike(this._likeCounts);
    } else {
      this._handleUnsetLike(this._likeCounts);
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.list__image');
    this._cardTitle = this._element.querySelector('.list__text');
    this._imageButton = this._element.querySelector('.list__button-image');
    this._likeButton = this._element.querySelector('.list__like');
    this._likeCounts = this._element.querySelector('.list__like-count');
    this._likeCounts.textContent = this._likes.length;

    this._removeButton = this._element.querySelector('.list__remove');
    this._setEventListeners();
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setLikes();
    this._checkDeleteButton();
    
    return this._element;
  }


  _setEventListeners() {
    this._likeButton.addEventListener('click', () =>
      this._toggleLike());
    this._imageButton.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link));
    if (this._ownerId === this._userId) {
      this._removeButton.addEventListener('click', () => {
        this._handleDeleteCard(this._cardId);
      });
    }
  }

  _checkDeleteButton() {
    if (this._ownerId !== this._userId){
      this._removeButton.remove();
    }
  }

  removeCard(){
    this._element.remove();
  }

  _setLikes(){
    if (this._likes.some(item => item._id === this._userId)) {
      this.setLikeButtonActive();
    } else {
      this.unsetLikeButtonActive();
    };
  }


  setLikeButtonActive() {
    this._likeButton.classList.add('list__like_active');
  }

  unsetLikeButtonActive() {
    this._likeButton.classList.remove('list__like_active');
  }
}
