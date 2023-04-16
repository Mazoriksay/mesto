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
  popupEditProfile.setSpinner();
  api.setProfileInfo(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupEditProfile.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupEditProfile.unsetSpinner('Сохранить'));
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
  const card = new Card(item, '#card-template', userId, popupPhoto.open,
  {handleDeleteCard: (cardId) => {
    popupDelete.open();
    popupDelete.handlerSubmit(() => {
      popupDelete.setSpinner();
      api.deleteCard(cardId)
        .then(() => {
          popupDelete.close();
          card.removeCard()
        })
        .catch((err) => console.log(err))
        .finally(() => popupDelete.unsetSpinner('Да'));
    })
  },
  handleSetLike: (id) => {
    setLikeCount(id)
      .then((res) => {
          card.setLikeCounter(res);
          card.setLikeButtonActive();
      })
      .catch((err) => console.log(err));
  },
  handleUnsetLike: (id) => {
    deleteLikeCount(id)
      .then((res) => {
        card.setLikeCounter(res);
        card.unsetLikeButtonActive();
      })
      .catch((err) => console.log(err));
  }
  });

  
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
  popupCard.setSpinner();
  api.addNewCard(data)
    .then((res) =>{
      cardList.addItem(createCard(res));
      popupCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupCard.unsetSpinner('Создать'));
}

buttonAdd.addEventListener('click', () => {
  popupCard.open()
  cardForm.resetValidation();
});

//

const popupAvatar = new PopupWithForm('#popup-avatar', handleAvatarFormSubmit);
popupAvatar.setEventListeners();

function handleAvatarFormSubmit(data) {
  popupAvatar.setSpinner();
  api.setAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupAvatar.close();  
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.unsetSpinner('Сохранить'));
}

buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
  avatarForm.resetValidation();
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