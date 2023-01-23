let popup = document.querySelector('.popup');
function popupActive() {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', nameProfile.textContent);
    aboutInput.setAttribute('value', aboutProfile.textContent);
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', popupActive);

let closeButton = document.querySelector('.popup__button-close');
closeButton.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__form');
let nameInput = document.getElementById('name');
let aboutInput = document.getElementById('about');
let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = `${nameInput.value}`;
    aboutProfile.textContent = `${aboutInput.value}`;
    popupClose()
}
formElement.addEventListener('submit', handleFormSubmit);
