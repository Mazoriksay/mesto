export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent
        };
    }

    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
    }

    setUserAvatar({avatar}) {
        this._profileAvatar.src = avatar;
    }
}