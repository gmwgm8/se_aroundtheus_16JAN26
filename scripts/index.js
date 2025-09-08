const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// DOM Elements
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

// Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

// Preview modal elements
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewCaption = previewImageModal.querySelector(
  ".modal__preview-caption"
);
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
// Form inputs
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// Modal functions

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

// Card functions
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Event listeners
  deleteButton.addEventListener("click", () => cardElement.remove());
  cardImage.addEventListener("click", () => handleImageClick(data));
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

// Form handlers
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  addCardFormElement.reset();
}

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewCaption.textContent = data.name;
  openModal(previewImageModal);
}

// Event listeners setup
function setupEventListeners() {
  // Form submissions
  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
  addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
  // Modal opening
  profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editProfileModal);
  });

  addNewCardButton.addEventListener("click", () => {
    addCardFormElement.reset();
    openModal(addCardModal);
  });

  // Modal closing - close buttons
  document.querySelectorAll(".modal__close").forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modal));
  });

  // Modal closing - click outside
  const modals = document.querySelectorAll(".modal");

  modals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (evt.target === modal) {
        closeModal(modal);
      }
    });
  });
}

setupEventListeners();
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
