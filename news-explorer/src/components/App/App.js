import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function openMenu() {
    setMenuIsOpen(menuIsOpen ? false : true);
  }

  const [popup, setPopup] = useState("Sign up");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function closePopup() {
    setIsPopupOpen(false);
  }

  function openPopup(popupName) {
    setPopup(popupName);
    setIsPopupOpen(true);
    setMenuIsOpen(false);
  }

  function changePopup() {
    setPopup(popup === "Sign up" ? "Sign in" : "Sign up");
  }

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
      <Routes>
        <Route path="/" element={<>
          <Header
            openMenu={openMenu}
            menuIsOpen={menuIsOpen}
            openPopup={openPopup}
          />
          <Main />
        </>} />
        <Route path="/saved-news" element={<>
          <Header
            theme="dark"
            openMenu={openMenu}
            menuIsOpen={menuIsOpen}
            openPopup={openPopup} />
          <SavedNewsHeader />
          <NewsCardList savedNews={true} />
        </>} />
      </Routes>
      <Footer />
      <Preloader />
      <PopupWithForm
        onClose={closePopup}
        setTo={popup}
        isOpen={isPopupOpen}
        changePopup={changePopup}
      />
    </div>
  );
}

export default App;

