const popupEdit = document.querySelector('#popup-edit');
function popupEditActive() {
    popupEdit.classList.add('popup_opened');
    nameInput.setAttribute('value', nameProfile.textContent);
    aboutInput.setAttribute('value', aboutProfile.textContent);
}

function popupEditClose() {
    popupEdit.classList.remove('popup_opened');
}

const editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', popupEditActive);

const closeButtonEdit = popupEdit.querySelector('.popup__button-close');
closeButtonEdit.addEventListener('click', popupEditClose);

const formEditElement = popupEdit.querySelector('.popup__form');
const nameInput = document.getElementById('name');
const aboutInput = document.getElementById('about');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = `${nameInput.value}`;
    aboutProfile.textContent = `${aboutInput.value}`;
    popupEditClose()
}
formEditElement.addEventListener('submit', handleEditFormSubmit);

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
    
    cardElement.querySelector('.list__like').addEventListener('click', function (evt) { 
      evt.target.classList.toggle('list__like_active');
    }); 
    
    cardElement.querySelector('.list__remove').addEventListener('click', function () {
      cardElement.remove();
    });

    cardElement.querySelector('.list__button-image').addEventListener('click', function () {
      const popupPhoto = document.querySelector('.photo');
      const popupImage = popupPhoto.querySelector('.photo__image');
      const popupText = popupPhoto.querySelector('.photo__text');

      popupPhoto.classList.add('photo_opened');
      popupImage.setAttribute('src', cardImage.getAttribute('src'));
      popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
      popupText.textContent = cardText.textContent;
    });
      
    cardsContainer.append(cardElement);
}

const popupCard = document.querySelector('#popup-card');

function popupCardActive() {
    popupCard.classList.add('popup_opened');
}

function popupCardClose() {
    popupCard.classList.remove('popup_opened');
}

const addButton = document.querySelector('.profile__add');
addButton.addEventListener('click', popupCardActive);

const closeButtonCard = popupCard.querySelector('.popup__button-close');
closeButtonCard.addEventListener('click', popupCardClose);

const placeInput = document.getElementById('place');
const linkInput = document.getElementById('link');
const formAddElement = popupCard.querySelector('.popup__form');

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardElement = cardTemplate.querySelector('.list__card').cloneNode(true);
    const cardImage = cardElement.querySelector('.list__image');
    const cardText = cardElement.querySelector('.list__text');
    
    cardImage.setAttribute('src', linkInput.value);
    cardImage.setAttribute('alt', placeInput.value);
    cardText.textContent = `${placeInput.value}`;
    
    cardElement.querySelector('.list__like').addEventListener('click', function (evt) { 
      evt.target.classList.toggle('list__like_active');
    });
    
    cardElement.querySelector('.list__remove').addEventListener('click', function () {
      cardElement.remove();
    });

    cardElement.querySelector('.list__button-image').addEventListener('click', function () {
      const popupPhoto = document.querySelector('.photo');
      const popupImage = popupPhoto.querySelector('.photo__image');
      const popupText = popupPhoto.querySelector('.photo__text');

      popupPhoto.classList.add('photo_opened');
      popupImage.setAttribute('src', cardImage.getAttribute('src'));
      popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
      popupText.textContent = cardText.textContent;

    });

    cardsContainer.prepend(cardElement);
    popupCardClose()
}
formAddElement.addEventListener('submit', handleCardFormSubmit);



document.querySelector('.photo__button-close').addEventListener('click', function () {
  const popupPhoto = document.querySelector('.photo');
  popupPhoto.classList.remove('photo_opened');
});