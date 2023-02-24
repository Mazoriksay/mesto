const popupEditProfile = document.querySelector('#popup-edit');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonEditClose = popupEditProfile.querySelector('.popup__button-close');
const formEditElement = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const cardsContainer = document.querySelector('.list');
const cardTemplate = document.querySelector('#card-template').content;
const popupCard = document.querySelector('#popup-card');
const buttonAdd = document.querySelector('.profile__add');
const buttonCloseCard = popupCard.querySelector('.popup__button-close');
const placeInput = document.querySelector('#place-input');
const linkInput = document.querySelector('#link-input');
const formAddElement = popupCard.querySelector('.popup__form');
const popupPhoto = document.querySelector('.photo');
const popupImage = popupPhoto.querySelector('.photo__image');
const popupText = popupPhoto.querySelector('.photo__text');
const buttonClosePhoto = document.querySelector('.photo__button-close');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function enterData() {
    nameInput.setAttribute('value', nameProfile.textContent);
    aboutInput.setAttribute('value', aboutProfile.textContent);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = `${nameInput.value}`;
  aboutProfile.textContent = `${aboutInput.value}`;
  closePopup(popupEditProfile);
}

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.list__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.list__image');
  const cardText = cardElement.querySelector('.list__text');
  
  cardImage.setAttribute('src', data.link); 
  cardImage.setAttribute('alt', data.name); 
  cardText.textContent = data.name; 
  
  cardElement.querySelector('.list__like').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('list__like_active');
  });
  
  cardElement.querySelector('.list__remove').addEventListener('click', function () {
    cardElement.remove();
  });

  cardElement.querySelector('.list__button-image').addEventListener('click', function () {
    openPopup(popupPhoto);
    
    popupImage.setAttribute('src', cardImage.getAttribute('src'));
    popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
    popupText.textContent = cardText.textContent;
  });
  
  return cardElement;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({
    name: placeInput.value,
    link: linkInput.value
  }));
  closePopup(popupCard);
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save');

  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    if (inputElement.value.length < 2) {
      return !inputElement.validity.valid;
    }
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
    buttonElement.classList.remove('popup__button-save_inactive');
  }
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
buttonEditProfile.addEventListener('click', enableValidation);

popupEditProfile.addEventListener('click', closePopupOverlay);
popupCard.addEventListener('click', closePopupOverlay);
popupPhoto.addEventListener('click', closePopupOverlay);

document.addEventListener('keydown', closePopupEscape);
document.addEventListener('keydown', closePopupEscape);
document.addEventListener('keydown', closePopupEscape);

buttonAdd.addEventListener('click', () => openPopup(popupCard));
buttonAdd.addEventListener('click', enableValidation);
buttonCloseCard.addEventListener('click', () => closePopup(popupCard));
formAddElement.addEventListener('submit', handleCardFormSubmit);

buttonClosePhoto.addEventListener('click', () => closePopup(popupPhoto));


for (i=0; i < initialCards.length; i++) {
  cardsContainer.append(createCard(initialCards[i]));
}