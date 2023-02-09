const popupEditProfile = document.querySelector('#popup-edit');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonEditClose = popupEditProfile.querySelector('.popup__button-close');
const formEditElement = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const cardsContainer = document.querySelector('.list');
const cardTemplate = document.querySelector('#card-template').content;
const popupCard = document.querySelector('#popup-card');
const buttonAdd = document.querySelector('.profile__add');
const buttonCloseCard = popupCard.querySelector('.popup__button-close');
const placeInput = document.querySelector('#place');
const linkInput = document.querySelector('#link');
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

buttonEditProfile.addEventListener('click', () => openPopup(popupEditProfile));
buttonEditProfile.addEventListener('click', enterData);
buttonEditClose.addEventListener('click', () => closePopup(popupEditProfile));
formEditElement.addEventListener('submit', handleEditFormSubmit);

buttonAdd.addEventListener('click', () => openPopup(popupCard));
buttonCloseCard.addEventListener('click', () => closePopup(popupCard));
formAddElement.addEventListener('submit', handleCardFormSubmit);

buttonClosePhoto.addEventListener('click', () => closePopup(popupPhoto));


for (i=0; i < initialCards.length; i++) {
  cardsContainer.append(createCard(initialCards[i]));
}
