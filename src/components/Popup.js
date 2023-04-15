export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closePopupOverlay = this._closePopupOverlay.bind(this);
        this._closePopupBtn = this._closePopupBtn.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closePopupOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
          }
    }

    _closePopupBtn(evt) {
        if (evt.target.classList.contains('popup__button-close')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', this._closePopupOverlay);
        this._popupElement.addEventListener('click', this._closePopupBtn);
    }
}