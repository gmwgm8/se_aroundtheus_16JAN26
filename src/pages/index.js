// Import CSS
import "../pages/index.css";

// Import images
import logoImage from "../images/aroundtheUSwhite.svg";
import profileImage from "../images/jacques-cousteau.jpg";
// Import classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Import constants
import { initialCards, validationConfig, selectors } from "../utils/utils.js";

// DOM Elements
const profileFormElement = document.querySelector(selectors.profileForm);
const addCardFormElement = document.querySelector(selectors.addCardForm);

// Buttons and other DOM nodes
const profileEditButton = document.querySelector(selectors.profileEditButton);
const addNewCardButton = document.querySelector(selectors.addCardButton);

// After DOM loads, set the images
document.querySelector(".header__image").src = logoImage;
document.querySelector(".profile__image").src = profileImage;

// Form inputs
const nameInput = profileFormElement.querySelector(selectors.profileNameInput);
const jobInput = profileFormElement.querySelector(selectors.profileJobInput);

// Create UserInfo instance
const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  jobSelector: selectors.profileDescription,
});

// Create PopupWithImage instance
const imagePopup = new PopupWithImage(selectors.previewImageModal);
imagePopup.setEventListeners();

// Function to handle image clicks
function handleImageClick(data) {
  imagePopup.open(data);
}

// Function to create a card
function createCard(cardData) {
  const card = new Card(cardData, selectors.cardTemplate, handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

// Create Section instance for cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  selectors.cardsList
);

// Create PopupWithForm instance for profile edit
const profilePopup = new PopupWithForm(
  selectors.profileEditModal,
  (formData) => {
    userInfo.setUserInfo({ name: formData.name, job: formData.description });
    profilePopup.close();
  }
);
profilePopup.setEventListeners();

// Create PopupWithForm instance for add card
const addCardPopup = new PopupWithForm(selectors.addCardModal, (formData) => {
  const cardElement = createCard({ name: formData.title, link: formData.url });
  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Create FormValidator instances
const editFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
const addFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Event listeners for opening modals
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  editFormValidator.resetValidation();
  profilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});

// Render initial cards on page load
cardSection.renderItems();
