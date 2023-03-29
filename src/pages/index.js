import Card from '../Card.js';
import FormValidate from '../FormValidate.js';
import Section from '../Section.js';
import {
  popupEditProfile,
  popupCard,
  popupPhoto,
  buttonEditProfile,
  buttonAdd,
  buttonCloseList,
  formEditElement,
  formAddElement,
  nameInput,
  aboutInput,
  placeInput,
  linkInput,
  nameProfile,
  aboutProfile,
  cardsContainerSelector,
  cardsContainer,
  popupImage,
  popupImageCaption,
  classValid,
  initialCards
} from '../utils/constants.js';


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

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = `${nameInput.value}`;
  aboutProfile.textContent = `${aboutInput.value}`;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardList = new Section({ 
      items: [{
        name: placeInput.value,
        link: linkInput.value
      }], 
      renderer: (item) => {
        const card = new Card(item, '#card-template', handleOpenPopup);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }
    }, 
    cardsContainerSelector
  );
  
  cardList.renderItems();
  closePopup(popupCard);
  formAddElement.reset();
}

export default function handleOpenPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
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
formAddElement.addEventListener('submit', handleCardFormSubmit);

buttonAdd.addEventListener('click', () => openPopup(popupCard));
buttonAdd.addEventListener('click',  () => cardForm.resetValidation());

buttonCloseList.forEach(btn =>{
  const popup = btn.closest('.popup');
  popup.addEventListener('mousedown', closePopupOverlay);
  btn.addEventListener('click', () => closePopup(popup));
});

const cardList = new Section({ 
    items: initialCards, 
    renderer: (item) => {
      const card = new Card(item, '#card-template', handleOpenPopup);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  }, 
  cardsContainerSelector
);
cardList.renderItems();

const profileForm = new FormValidate(classValid, document.querySelector('#profile-form'));
profileForm.enableValidation();

const cardForm = new FormValidate(classValid, document.querySelector('#card-form'));
cardForm.enableValidation();