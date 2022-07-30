import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__del-button hover element__del-button_${
    isOwn ? "visible" : "hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `hover element__like-button${
    isLiked ? "_active" : ""
  }`;

  return (
    <li className="element">
      <img
        onClick={() => onCardClick(card)}
        src={card.link}
        className="element__pic"
        alt={card.name}
      />
      <button
        onClick={() => onCardDelete(card)}
        className={cardDeleteButtonClassName}
        type="button"
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            onClick={() => onCardLike(card)}
            className={cardLikeButtonClassName}
            type="button"
          />
          <p className="element__like-value">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default React.memo(Card);
