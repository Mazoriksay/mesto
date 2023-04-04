import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._formInputs = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const inputValues = {};
        this._formInputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}