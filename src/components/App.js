import React from 'react';

import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserProfile().then((userProfile) => {
      setCurrentUser(userProfile);
    });
  }, []);

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

  function handleUpdateUser({ newUserName, newUserAbout }) {
    api
      .editUserProfile({ newUserName, newUserAbout })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
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
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          ></EditProfilePopup>
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
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
