import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidate from '../components/FormValidate.js';
import Section from '../components/Section.js';
import PopupDelete from '../components/PopupDelete.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import {
  buttonEditProfile,
  buttonAdd,
  buttonAvatar,
  buttonSaveProfile,
  buttonSaveCard,
  buttonSaveDel,
  buttonSaveAvatar,
  nameInput,
  aboutInput,
  cardsContainerSelector,
  classValid,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'b4997ac3-87d8-4b2f-aabd-f23b0e31024b',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

function setLikeCount(id) {
  return api.setLikeCount(id);
}

function deleteLikeCount(id) {
  return api.deleteLikeCount(id);
}

//
function enterData() {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
  profileForm.resetValidation();
}

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();

function handleEditFormSubmit(data) {
  buttonSaveProfile.value = "Сохранение...";  
  api.setProfileInfo(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupEditProfile.close();
    buttonSaveProfile.value = "Сохранить";  
  })
  .catch((err) => console.log(err));

}

buttonEditProfile.addEventListener('click', () => {
  enterData();
  popupEditProfile.open();
});
//

const popupPhoto =  new PopupWithImage('.photo');
popupPhoto.setEventListeners();

const popupDelete = new PopupDelete('#popup-delete');
popupDelete.setEventListeners();

function createCard(item) {
  const card = new Card(item, '#card-template', userId, popupPhoto.open, setLikeCount, deleteLikeCount, 
  {handleDeleteCard: (cardId) => {
    popupDelete.open();
    popupDelete.handlerSubmit(() => {
      buttonSaveDel.value = 'Сохранение...';
      api.deleteCard(cardId)
        .then(() => {
          popupDelete.close();
          card.removeCard()
          buttonSaveDel.value = 'Да';
        })
        .catch((err) => console.log(err));
    })
  }}
  )
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({ 
    renderer: (item) => {
      cardList.addItem(createCard(item));
    }
  }, 
  cardsContainerSelector
);

//
const popupCard = new PopupWithForm('#popup-card', handleCardFormSubmit);
popupCard.setEventListeners();

function handleCardFormSubmit(data) {
  buttonSaveCard.value = "Сохранение...";
  api.addNewCard(data)
    .then((res) =>{
      cardList.addItem(createCard(res));
      popupCard.close();
      buttonSaveCard.value = "Создать";  
    })
    .catch((err) => console.log(err));
}

buttonAdd.addEventListener('click', () => {
  popupCard.open()
  cardForm.resetValidation();
});

//

const popupAvatar = new PopupWithForm('#popup-avatar', handleAvatarFormSubmit);
popupAvatar.setEventListeners();

function handleAvatarFormSubmit(data) {
  buttonSaveAvatar.value = "Сохранение...";
  api.setAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupAvatar.close();
      buttonSaveAvatar.value = "Создать";  
    })
    .catch((err) => console.log(err)); 
}

buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
  cardForm.resetValidation();
});

const profileForm = new FormValidate(classValid, document.querySelector('#profile-form'));
profileForm.enableValidation();

const cardForm = new FormValidate(classValid, document.querySelector('#card-form'));
cardForm.enableValidation();

const avatarForm = new FormValidate(classValid, document.querySelector('#avatar-form'));
avatarForm.enableValidation();

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  cardList.renderItems(initialCards.reverse());
})
.catch((err) => console.log(err));