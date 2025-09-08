function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
function disableButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, config);
  });
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach(function (inputElement) {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  }
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (formElement) {
    setEventListeners(formElement, config);
  });
}

// Initialize validation with configuration
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
