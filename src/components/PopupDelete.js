import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupSubmitBtn = this._popupElement.querySelector('.popup__button-save');
        this._form = document.querySelector('#delete-form');
        this.open = this.open.bind(this);
    }

    _handleDeleteCard(evt) {
        evt.preventDefault();
        this._handleDeleteCard();
    }

    setSpinner() {
        this._popupSubmitBtn.value = 'Сохранение...';
    }

    unsetSpinner(text) {
        this._popupSubmitBtn.value = text;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerSubmitForm()
        });
    }

    handlerSubmit(func) {
        this._handlerSubmitForm = func;
    }

}