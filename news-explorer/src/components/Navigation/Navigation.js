import { Link } from "react-router-dom";

function Navigation(props) {

    function openSigninPopup() {
        props.openPopup("Sign in");
    }

    return (
        <nav className={`nav nav_theme_${props.theme} ${props.isMenuOpen ? "nav_enable" : ""}`}>
            <ul className="nav__list">
                <Link to="/" className={`nav__item ${props.theme === "dark" ? "" : "nav__item_with_mark"} nav__item_theme_${props.theme}`}>Home</Link>
                <Link to="/saved-news" className={`nav__item ${props.theme === "dark" ? "nav__item_with_mark" : ""} nav__item_theme_${props.theme}`}>Saved articles</Link>
            </ul>
            <button
                className={`nav__auth-button nav__auth-button_theme_${props.theme}`}
                onClick={openSigninPopup}
            >Sign in</button>
        </nav>
    );
}

export default Navigation;