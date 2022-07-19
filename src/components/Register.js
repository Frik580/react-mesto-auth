import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Register({ onReg, onLog, onRegister }) {
  const [state, setState] = useState("");
  const inputRef = useRef();
  const isValid = true;
  const inputStyle = {
    color: "#fff",
    borderBottomColor: "#ccc",
  };

  useEffect(() => {
    setState({ email: "", password: "" });
    inputRef.current.focus();
    onReg(false);
    onLog(true);
  }, []);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      onRegister({ email: state.email, password: state.password });
  };

  return (
    <div className="conteiner">
      <form onSubmit={handleSubmit} className="form">
        <h3 className="form__title">Регистрация</h3>
        <fieldset className="form__conteiner">
          <input
            type="email"
            ref={inputRef}
            value={state.email ?? ""}
            onChange={handleInputChange}
            name="email"
            className="form__item"
            style={inputStyle}
            placeholder="Email"
            required
          />
          <span id="user-name-error" className="error" />
        </fieldset>
        <fieldset className="form__conteiner">
          <input
            type="password"
            value={state.password ?? ""}
            onChange={handleInputChange}
            name="password"
            className="form__item"
            style={inputStyle}
            placeholder="Пароль"
            required
          />
          <span id="about-error" className="error" />
        </fieldset>

        <button
          disabled={!isValid}
          className={`form__button_dark ${!isValid && "form__button_disabled"}`}
          type="submit"
          name="button"
        >
          Зарегистрироваться
        </button>
        <div className="form__text">
          {`Уже зарегистрированы? `}
          <Link to="/sign-in" className="link hover" style={{ fontSize: 14 }}>
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Register);
