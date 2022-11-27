import React from 'react';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <div className="content">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteCardButtonClick={handleDeleteCardClick}
        />
        <Footer />
      </div>

      {/* попап редактирования профиля (отрисовываем только тогда, когда isEditProfilePopupOpen=true)*/}
      {isEditProfilePopupOpen && (
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          submitButtonName="Сохранить"
        >
          <input
            className="popup__input"
            type="text"
            name="popup-profile-name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error popup-profile-name-error"></span>
          <input
            className="popup__input"
            type="text"
            name="popup-profile-job"
            placeholder="Род занятий"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error popup-profile-job-error"></span>
        </PopupWithForm>
      )}

      {/* попап добавления карточки */}
      {isAddPlacePopupOpen && (
        <PopupWithForm
          title="Новое место"
          name="add-place"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          submitButtonName="Создать"
        >
          <input
            className="popup__input"
            type="text"
            name="popup-new-card-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__error popup-new-card-name-error"></span>
          <input
            className="popup__input"
            type="url"
            name="popup-new-card-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error popup-new-card-link-error"></span>
        </PopupWithForm>
      )}

      {/* попап обновления аватара */}
      {isEditAvatarPopupOpen && (
        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          submitButtonName="Сохранить"
        >
          <input
            className="popup__input"
            type="url"
            name="popup-new-avatar-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error popup-new-avatar-link-error"></span>
        </PopupWithForm>
      )}

      {/* попап раскрытия картинки */}
      {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}

      {/* попап удаления карточки */}
      {isDeleteCardPopupOpen && (
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          submitButtonName="Да"
        />
      )}
    </>
  );
}

export default App;
