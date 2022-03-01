import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/currentUserContext';


function Navigation(props) {

    const currentUser = React.useContext(CurrentUserContext);

    function openSigninPopup() {
        props.openPopup("Sign in");
    }

    return (
        <nav className={`nav nav_theme_${props.theme} ${props.isMenuOpen ? "nav_enable" : ""}`}>
            <ul className="nav__list">
                <Link
                    to="/"
                    className={`nav__item ${props.theme === "dark" ? "" : "nav__item_with_mark"} nav__item_theme_${props.theme}`}
                    onClick={props.closeMenu}
                >Home</Link>
                {props.loggedIn &&
                    <Link
                        to="/saved-news"
                        onClick={props.closeMenu}
                        className={`nav__item ${props.theme === "dark" ? "nav__item_with_mark" : ""} nav__item_theme_${props.theme}`}
                    >Saved articles</Link>}
            </ul>
            <button
                className={`nav__auth-button nav__auth-button_theme_${props.theme} ${props.loggedIn ? "nav__auth-button_logged-in" : ""}`}
                onClick={props.loggedIn ? props.handleLogout : openSigninPopup}
            >{props.loggedIn ? currentUser.name : "Sign in"}
                {props.loggedIn && <div className={`nav__logout-icon ${props.theme === "dark" ? "nav__logout-icon_dark" : ""}`} />}
            </button>
        </nav>
    );
}

export default Navigation;