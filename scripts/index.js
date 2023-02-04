let popup = document.querySelector('.popup');
function popupActive() {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', nameProfile.textContent);
    aboutInput.setAttribute('value', aboutProfile.textContent);
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', popupActive);

let closeButton = document.querySelector('.popup__button-close');
closeButton.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__form');
let nameInput = document.getElementById('name');
let aboutInput = document.getElementById('about');
let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = `${nameInput.value}`;
    aboutProfile.textContent = `${aboutInput.value}`;
    popupClose()
}
formElement.addEventListener('submit', handleFormSubmit);

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

const cardsContainer = document.querySelector('.list');
const cardTemplate = document.querySelector('#card-template').content;
for (i=0; i < initialCards.length; i++) {
    const cardElement = cardTemplate.querySelector('.list__card').cloneNode(true);
    const cardImage = cardElement.querySelector('.list__image');
    const cardText = cardElement.querySelector('.list__text');
    cardImage.setAttribute('src', initialCards[i].link);
    cardImage.setAttribute('alt', initialCards[i].name);
    cardText.textContent = initialCards[i].name;
    cardsContainer.append(cardElement);
}