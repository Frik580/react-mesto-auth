import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect, useState } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonValue, setButtonValue] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonValue("Сохранение...");
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.value = "";
    setButtonValue("Сохранить");
  }, [isOpen]);

  return (
    <PopupWithForm
      // name="avatar"
      title="Обновить аватар"
      buttonValue={buttonValue}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      conteinerSize="popup__conteiner_size_medium"
      isValid={true}
    >
      <fieldset className="form__conteiner">
        <input
          type="url"
          ref={inputRef}
          id="avatar"
          name="avatar"
          className="form__item"
          minLength="2"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="avatar-error" className="error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default React.memo(EditAvatarPopup);
