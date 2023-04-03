import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupImageCaption = this._popupSelector.querySelector('.popup__photo-text');
        this.open = this.open.bind(this);
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageCaption.textContent = name;
        super.open();
    }
}