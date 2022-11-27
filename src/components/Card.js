function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteButtonClick() {
    props.onDeleteCardButtonClick();
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <button
        className="element__delete"
        type="button"
        onClick={handleDeleteButtonClick}
      ></button>
      <div className="element__info">
        <h2 className="element__name">{props.name}</h2>
        <div className="element__likes-area">
          <button className="element__like" type="button"></button>
          <p className="element__likes-counter">{props.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
