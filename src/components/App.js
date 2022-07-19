import { useState, useEffect } from "react";
import api from "../utils/Api";
import * as auth from "../utils/Auth";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isPostCardError, setIsPostCardError] = useState(false);
  const [isEditAvatarError, setIsEditAvatarError] = useState(false);
  const [isEditProfileError, setIsEditProfileError] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [userEmail, SetUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  // API даннах
  useEffect(() => {
    const promises = [api.getUserInfo(), api.getCardList()];
    Promise.all(promises)
      .then((results) => {
        setCurrentUser(results[0]);
        setCards(results[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function reloadCards() {
    api
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        setIsEditProfileError(true);
        setTimeout(() => {
          setIsEditProfileError(false);
        }, 4000);
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        setIsEditAvatarError(true);
        setTimeout(() => {
          setIsEditAvatarError(false);
        }, 4000);
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        reloadCards();
      })
      .catch((err) => {
        setIsPostCardError(true);
        setTimeout(() => {
          setIsPostCardError(false);
        }, 4000);
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const id = card._id;
    api
      .deleteCard(card)
      .then(() => {
        const newCards = cards.filter(function (card) {
          return card._id !== id;
        });
        setCards(newCards);
        closeAllPopups();
        reloadCards();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setSelectedCard({});
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSubmitPopupOpen(false);
    setIsInfoTooltip(false);
  }

  useEffect(() => {
    if (loggedIn) {
      setSignIn(false);
      setSignUp(false);
      navigate("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      handleAuth(jwt);
    }
  }, [loggedIn]);

  const onLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  // API фронтенд-аутентификации
  const handleAuth = async (jwt) => {
    const content = await auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          SetUserEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return content;
  };

  const onRegister = ({ email, password }) => {
    setIsRegister(true);
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        setIsInfoTooltip(true);
        navigate("/sign-in");
        return res;
      })
      // .then(() => navigate("/sign-in"))
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsRegister(false);
        console.log(err);
      });
  };

  const onLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageError("Что-то пошло не так. Проверьте email и пароль.");
      })
      .finally(() => {
        setTimeout(() => {
          setMessageError("");
        }, 4000);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header
          loggedIn={loggedIn}
          signIn={signIn}
          signUp={signUp}
          email={userEmail}
          onLogout={onLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={() => setIsEditProfilePopupOpen(true)}
                  onAddPlace={() => setIsAddPlacePopupOpen(true)}
                  onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                  onCardClick={(data) => setSelectedCard(data)}
                  onCardDelete={(data) => {
                    setIsSubmitPopupOpen(true);
                    setDeletedCard(data);
                  }}
                  onCardLike={handleCardLike}
                  cards={cards}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="sign-up"
            element={
              <Register
                onReg={(data) => setSignUp(data)}
                onLog={(data) => setSignIn(data)}
                onRegister={onRegister}
              />
            }
          />
          <Route
            path="sign-in"
            element={
              <Login
                onReg={(data) => setSignUp(data)}
                onLog={(data) => setSignIn(data)}
                onLogin={onLogin}
                messageError={messageError}
              />
            }
          />
          <Route
            path="*"
            element={
              <p style={{ textAlign: "center" }}>Здесь ничего нет: 404!</p>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isEditProfileError={isEditProfileError}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isEditAvatarError={isEditAvatarError}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPostCardError={isPostCardError}
        />

        <SubmitPopup
          card={deletedCard}
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isRegister={isRegister}
        />

        <ImagePopup сard={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
