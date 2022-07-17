import React from "react";
import { Link } from "react-router-dom";

function Header({ loggedIn, signIn, signUp }) {
  return (
    <header className="header">
      <p className="header__logo"></p>
      <div style={{ marginLeft: "auto", display: "flex" }}>
        {signIn && (
          <Link to="sign-in" className="link hover">
            Войти
          </Link>
        )}
        {signUp && (
          <Link to="sign-up" className="link hover">
            Регистрация
          </Link>
        )}
        {loggedIn && (
          <>
            <p className="header__text">Email</p>
            <p className="link" style={{ color: "#A9A9A9" }}>
              Выйти
            </p>
          </>
        )}
      </div>
      <p></p>
    </header>
  );
}

export default React.memo(Header);
