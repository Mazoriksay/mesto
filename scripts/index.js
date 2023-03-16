import { Card, initialCards } from './card.js';
import { FormValidate, classValid} from './validate.js';
export {popupPhoto, openPopup};

const popupEditProfile = document.querySelector('#popup-edit');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonEditClose = popupEditProfile.querySelector('.popup__button-close');
const formEditElement = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const cardsContainer = document.querySelector('.list');
const popupCard = document.querySelector('#popup-card');
const buttonAdd = document.querySelector('.profile__add');
const buttonCloseCard = popupCard.querySelector('.popup__button-close');
const placeInput = document.querySelector('#place-input');
const linkInput = document.querySelector('#link-input');
const formAddElement = popupCard.querySelector('.popup__form');
const popupPhoto = document.querySelector('.photo');
const buttonClosePhoto = document.querySelector('.photo__button-close');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

function enterData() {
    nameInput.value = nameProfile.textContent;
    aboutInput.value = aboutProfile.textContent;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = `${nameInput.value}`;
  aboutProfile.textContent = `${aboutInput.value}`;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card({
    name: placeInput.value,
    link: linkInput.value
  }, '#card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupCard);
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('photo')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

buttonEditProfile.addEventListener('click', () => openPopup(popupEditProfile));
buttonEditProfile.addEventListener('click', enterData);
buttonEditClose.addEventListener('click', () => closePopup(popupEditProfile));
formEditElement.addEventListener('submit', handleEditFormSubmit);

popupEditProfile.addEventListener('mousedown', closePopupOverlay);
popupCard.addEventListener('mousedown', closePopupOverlay);
popupPhoto.addEventListener('mousedown', closePopupOverlay);

buttonAdd.addEventListener('click', () => openPopup(popupCard));
buttonCloseCard.addEventListener('click', () => closePopup(popupCard));
formAddElement.addEventListener('submit', handleCardFormSubmit);

buttonClosePhoto.addEventListener('click', () => closePopup(popupPhoto));

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
});

const profileForm = new FormValidate(classValid, '#profile-form');
profileForm.enableValidation();

const cardForm = new FormValidate(classValid, '#card-form')
buttonAdd.addEventListener("click", () => cardForm.enableValidation());