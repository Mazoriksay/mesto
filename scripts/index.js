function popupActive() {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
}

function popupClose() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', popupActive);

let closeButton = document.querySelector('.popup__button-close');
closeButton.addEventListener('click', popupClose);

let formElement = document.querySelector('form');
let nameInput = document.getElementById('name');
let aboutInput = document.getElementById('about');
let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');
nameInput.setAttribute('value', nameProfile.textContent);
aboutInput.setAttribute('value', aboutProfile.textContent);

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = `${nameInput.value}`;
    aboutProfile.textContent = `${aboutInput.value}`;
}
formElement.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', popupClose);