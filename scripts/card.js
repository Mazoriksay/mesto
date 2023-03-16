import {popupPhoto, openPopup} from "./index.js";
export {initialCards, Card};

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.list__card')
      .cloneNode(true);
    
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    if (this._link.startsWith('http')) this._element.querySelector('.list__image').src = this._link; 
    this._element.querySelector('.list__image').alt = this._name;
    this._element.querySelector('.list__text').textContent = this._name;

    document.querySelector('#place-input').value = "";
    document.querySelector('#link-input').value = "";
    return this._element;
  }

  _setAttributes() {
    document.querySelector('.photo__image').setAttribute('src', this._link);
    document.querySelector('.photo__image').setAttribute('alt', this._name);
    document.querySelector('.photo__text').textContent = this._name;
    openPopup(popupPhoto);
  }

  _setEventListeners() {
    this._element.querySelector('.list__like').addEventListener('click', (evt) =>
      evt.target.classList.toggle('list__like_active'));
    this._element.querySelector('.list__remove').addEventListener('click', () =>
      this._element.remove());
    this._element.querySelector('.list__button-image').addEventListener('click', () =>
      this._setAttributes());
  }
}
