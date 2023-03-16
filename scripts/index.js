import { Card } from './Card.js';
import { FormValidate } from './Validate.js';

const popupEditProfile = document.querySelector('#popup-edit');
const buttonEditProfile = document.querySelector('.profile__edit');
const formEditElement = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const cardsContainer = document.querySelector('.list');
const popupCard = document.querySelector('#popup-card');
const buttonAdd = document.querySelector('.profile__add');
const placeInput = document.querySelector('#place-input');
const linkInput = document.querySelector('#link-input');
const formAddElement = popupCard.querySelector('.popup__form');
const popupPhoto = document.querySelector('.photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageCaption = popupPhoto.querySelector('.popup__photo-text');
const buttonCloseList = document.querySelectorAll('.popup__button-close');


const classValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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
    profileForm.resetValidation();
}

function removeInput() {
  placeInput.value = "";
  linkInput.value = "";
}

function createCard() {
  return new Card({
    name: placeInput.value,
    link: linkInput.value
  }, '#card-template');
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = `${nameInput.value}`;
  aboutProfile.textContent = `${aboutInput.value}`;
  closePopup(popupEditProfile);
}

function banEnter(evt) {
  if (evt.key === "Enter") {
    evt.preventDefault()
    return false;
  }
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard();
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupCard);
}

function handleOpenPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = link;
  popupImageCaption.textContent = name;
  openPopup(popupPhoto);
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile)
  enterData()
});

formEditElement.addEventListener('submit', handleEditFormSubmit);
formEditElement.addEventListener('keydown', banEnter);

formAddElement.addEventListener('submit', handleCardFormSubmit);
formAddElement.addEventListener('keydown',  banEnter);


popupEditProfile.addEventListener('mousedown', closePopupOverlay);
popupCard.addEventListener('mousedown', closePopupOverlay);
popupPhoto.addEventListener('mousedown', closePopupOverlay);

buttonAdd.addEventListener('click', () => openPopup(popupCard));
buttonAdd.addEventListener('click', removeInput);
buttonAdd.addEventListener('click',  () => cardForm.resetValidation());

buttonCloseList.forEach(btn =>{
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach(item => {
  const card = new Card(item, '#card-template', handleOpenPopup);
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
});

const profileForm = new FormValidate(classValid, document.querySelector('#profile-form'));
profileForm.enableValidation();

const cardForm = new FormValidate(classValid, document.querySelector('#card-form'));
cardForm.enableValidation();