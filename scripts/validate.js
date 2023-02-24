function showInputError(formElement, inputElement, errorMessage, el) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(el.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(el.errorClass);
}
  
function hideInputError(formElement, inputElement, el) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(el.inputErrorClass);
    errorElement.classList.remove(el.errorClass);
    errorElement.textContent = '';
}
  
function checkInputValidity(formElement, inputElement, el) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, el);
    } else {
        hideInputError(formElement, inputElement, el);
    }
}
  
function setEventListeners(el, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(el.inputSelector));
    const buttonElement = formElement.querySelector(el.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, el);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, el);
            toggleButtonState(inputList, buttonElement, el);
        });
    });
}
  
function enableValidation(el) {
    const formList = Array.from(document.querySelectorAll(el.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(el, formElement);
    });
}
  
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
  
function toggleButtonState(inputList, buttonElement, el) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(el.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(el.inactiveButtonClass);
    }
}
  
const classValid = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(classValid);