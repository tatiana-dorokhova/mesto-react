import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([userProfile, initialCards]) => {
        setUserName(userProfile.name);
        setUserDescription(userProfile.about);
        setUserAvatar(userProfile.avatar);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile section">
        <div
          className="profile__avatar"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${userAvatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__text">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements section" aria-label="cards">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              {...card}
              card={card}
              onCardClick={props.onCardClick}
              onDeleteCardButtonClick={props.onDeleteCardButtonClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
