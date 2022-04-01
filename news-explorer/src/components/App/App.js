import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Login from "../Login/Login";
import Register from "../Register/Register";
import RegistrationSuccessfullyPopup from "../RegistrationSuccessfullyPopup/RegistrationSuccessfullyPopup";
import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import mainApi from '../../utils/MainApi';
import sortKeywords from '../../utils/sortKeywords';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState("Sign up");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywordsSentence, setkeywordsSentence] = useState("");
  const [renderCards, setRenderCards] = React.useState(false);


  function closeMenu() {
    setMenuIsOpen(false);
  }

  function openMenu() {
    setMenuIsOpen(menuIsOpen ? false : true);
  }

  function closePopup() {
    setIsPopupOpen(false);
    setTimeout(() => {
      setPopup("Sign in");
    }, 1000);
  }

  function openPopup(popupName) {
    setPopup(popupName);
    setIsPopupOpen(true);
    setMenuIsOpen(false);
  }

  function changePopup() {
    if (popup === "Sign up successfully") {
      setPopup("Sign in");
    } else {
      setPopup(popup === "Sign up" ? "Sign in" : "Sign up");
    }
  }

  function handleRegistration(registerDetails) {
    mainApi.register(registerDetails)
      .then((res) => {
        if (!res) {
          return Promise.reject(new Error('Incorrect email or password'))
        }
        setPopup("Sign up successfully");
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function getUserInfo() {
    return mainApi.getUserInfo(localStorage.getItem('JWT'))
      .then((res) => {
        setCurrentUser(res.data[0]);
        setLoggedIn(true);
        mainApi.addToken(localStorage.getItem('JWT'));
        getSavedArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(loginDetails) {
    mainApi.login(loginDetails)
      .then((res) => {
        localStorage.setItem('JWT', res.token);
        setLoggedIn(true);
        getUserInfo(res.token);
        mainApi.addToken(res.token);
        getSavedArticles();
        closePopup();
      })
      .catch((err) => {
        alert("could not sign in, try again")
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('newsArticles');
    setRenderCards(false);
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  function getSavedArticles() {
    mainApi.getSavedArticles()
      .then((res) => {
        const initialArticles = res.data.reverse();
        setSavedArticles(initialArticles.filter(article => article.owner === currentUser._id));
        setkeywordsSentence(sortKeywords(savedArticles));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSaveArticle(article) {
    console.log(article);
    const articleData = {
      keyword: localStorage.getItem('keyword'),
      title: article.title,
      text: article.description,
      date: article.date,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage
    }
    mainApi.saveArticle(articleData)
      .then((res) => {
        getSavedArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteArticle(article) {
    console.log('handleDeleteArticle');
    if (article._id) {
      mainApi.deleteArticle(article._id)
        .then((res) => {
          console.log(res);
          getSavedArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(article);
      const articleId = savedArticles.find((savedArticle) => savedArticle.link === article.url)._id;
      console.log(articleId);
      mainApi.deleteArticle(articleId)
        .then((res) => {
          console.log(res);
          getSavedArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem('JWT')) {
      getUserInfo()
        .then(() => {
          getSavedArticles();
        });
    }
  }, [])


  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<>
            <Header
              closeMenu={closeMenu}
              handleLogout={handleLogout}
              loggedIn={loggedIn}
              openMenu={openMenu}
              menuIsOpen={menuIsOpen}
              openPopup={openPopup}
            />
            <Main
              renderCards={renderCards}
              setRenderCards={setRenderCards}
              openPopup={openPopup}
              savedArticles={savedArticles}
              handleSaveArticle={handleSaveArticle}
              handleDeleteArticle={handleDeleteArticle}
              loggedIn={loggedIn}
            />
          </>} />
          <Route path="/saved-news" element={<>
            <ProtectedRoute
              loggedIn={loggedIn}
              openPopup={openPopup}
            >
              <Header
                closeMenu={closeMenu}
                handleLogout={handleLogout}
                loggedIn={loggedIn}
                theme="dark"
                openMenu={openMenu}
                menuIsOpen={menuIsOpen}
                openPopup={openPopup} />
              <SavedNewsHeader
                getSavedArticles={getSavedArticles}
                savedArticles={savedArticles}
                keywordsSentence={keywordsSentence}
              />
              <NewsCardList
                handleDeleteArticle={handleDeleteArticle}
                cardsList={savedArticles}
                loggedIn={loggedIn}
                savedNews={true}
              />
            </ProtectedRoute>
          </>} />
        </Routes>
        <Footer />
        <PopupWithForm
          handleLogin={handleLogin}
          handleRegistration={handleRegistration}
          onClose={closePopup}
          setTo={popup}
          isOpen={isPopupOpen}
          changePopup={changePopup}
        >
          {
            popup === "Sign up successfully" ?
              <RegistrationSuccessfullyPopup changePopup={changePopup} /> :
              popup === "Sign up" ?
                <Register
                  handleRegistration={handleRegistration}
                  changePopup={changePopup}
                  onClose={closePopup}
                  setTo={popup}
                /> :
                popup === "Sign in" ? <Login
                  handleLogin={handleLogin}
                  changePopup={changePopup}
                  onClose={closePopup}
                  setTo={popup}
                /> : ""
          }
        </PopupWithForm>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

