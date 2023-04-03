import Card from './components/Card.js';
import FormValidate from './components/FormValidate.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import './styles/index.css';
import {
  buttonEditProfile,
  buttonAdd,
  nameInput,
  aboutInput,
  cardsContainerSelector,
  classValid,
  initialCards
} from './utils/constants.js';

const userInfo = new UserInfo('.profile__name', '.profile__about');

function enterData() {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
  profileForm.resetValidation();
}

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();

function handleEditFormSubmit({name, about}) {
  userInfo.setUserInfo({name, about});
  popupEditProfile.close();
}

buttonEditProfile.addEventListener('click', () => {
  enterData();
  popupEditProfile.open();
});

const popupPhoto =  new PopupWithImage('.photo');
popupPhoto.setEventListeners();

const cardList = new Section({ 
    items: initialCards, 
    renderer: (item) => {
      const card = new Card(item, '#card-template', popupPhoto.open);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  }, 
  cardsContainerSelector
);
cardList.renderItems();

function handleCardFormSubmit(data) {
  const cardList = new Section({ 
      items: [{
        name: data.place,
        link: data.link
      }], 
      renderer: (item) => {
        const card = new Card(item, '#card-template', popupPhoto.open);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }
    }, 
    cardsContainerSelector
  );
  
  cardList.renderItems();
  popupCard.close();
}

const popupCard =  new PopupWithForm('#popup-card', handleCardFormSubmit);
popupCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupCard.open()
  cardForm.resetValidation;
});

const profileForm = new FormValidate(classValid, document.querySelector('#profile-form'));
profileForm.enableValidation();

const cardForm = new FormValidate(classValid, document.querySelector('#card-form'));
cardForm.enableValidation();