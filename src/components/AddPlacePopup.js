import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      newCardName: name,
      newCardLink: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonName="Создать"
    >
      <input
        className="popup__input"
        type="text"
        name="popup-new-card-name"
        onChange={handleNameChange}
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
        onChange={handleLinkChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup-new-card-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
