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
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api.getUserProfile().then((userProfile) => {
      setCurrentUser(userProfile);
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log('isLiked = ', isLiked);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((prevState) =>
        prevState.map((c) => (c._id === card._id ? newCard : c))
      ).catch((err) => console.log(err));
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(
        setCards(
          cards.filter((item) => {
            return item._id === card._id ? null : item;
          })
        )
      )
      .catch((err) => console.log(err));
  }

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

  function handleUpdateAvatar(newAvatarLink) {
    api
      .updateUserAvatar(newAvatarLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ newCardName, newCardLink }) {
    api
      .addNewCard({ newCardName, newCardLink })
      .then((newCard) => {
        setCards([newCard, ...cards]);
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
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

        {/* попап обновления аватара */}
        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
        )}

        {/* попап добавления карточки */}
        {isAddPlacePopupOpen && (
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          ></AddPlacePopup>
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
