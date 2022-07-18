import React, { useState, useRef, useEffect } from "react";

function Login({ onReg, onLog, onLogin, message }) {
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
    onReg(true);
    onLog(false);
  }, []);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ email: state.email, password: state.password })
      .then(() => setState(""))
      .catch((err) => console.log(err));
  };

  return (
    <div className="conteiner">
      <form onSubmit={handleSubmit} className="form">
        <h3 className="form__title">Вход</h3>
        {message}
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default React.memo(Login);
