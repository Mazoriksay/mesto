import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = document.querySelector('#delete-form');
        this.open = this.open.bind(this);
    }

    _handleDeleteCard(evt) {
        evt.preventDefault();
        this._handleDeleteCard();
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