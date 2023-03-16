export { Card };

class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
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
    this._element.querySelector('.list__like').classList.toggle('list__like_active');
  }

  _removeCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.list__image');
    this._cardTitle = this._element.querySelector('.list__text');
    this._imageButton = this._element.querySelector('.list__button-image');
    this._likeButton = this._element.querySelector('.list__like');
    this._removeButton = this._element.querySelector('.list__remove');
    this._setEventListeners();
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
   this._cardTitle.textContent = this._name;

    return this._element;
  }

  

  _setEventListeners() {
    this._likeButton.addEventListener('click', () =>
      this._toggleLike());
    this._removeButton.addEventListener('click', () =>
      this._removeCard());
   this._imageButton.addEventListener('click', () =>
      this._handleOpenPopup(this._name, this._link));
  }

}
