import React from "react";

function InfoTooltip({ isOpen, onClose, isLogin }) {
  return (
    <div
      onClick={onClose}
      className={`popup popup_dark ${isOpen && "popup_opened"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="popup__conteiner"
      >
        <button
          onClick={onClose}
          className="popup__close-button hover"
          type="button"
        />
        <div className="infotooltip">
          <div
            className={`infotooltip__pic_type_${isLogin ? "ok" : "error"}`}
          />
          <p className="infotooltip__text">
            {isLogin
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(InfoTooltip);
