import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._formInputs = this._popupForm.querySelectorAll('.popup__input');
        this._inputValues = {};
    }

    _getInputValues() {
        this._formInputs.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}