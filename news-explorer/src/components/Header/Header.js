import Navigation from '../Navigation/Navigation'

function Header(props) {

    return (

        <header className={`header header_theme_${props.theme} ${props.menuIsOpen ? "header_open" : ""}`}>
            <p className="header__logo">NewsExplorer</p>
            <button
                className={`header__toggle-button ${props.menuIsOpen ? "header__toggle-button_symbol_close" : ""}`}
                onClick={props.openMenu}
            />
            <Navigation
                isMenuOpen={props.menuIsOpen}
                theme={props.theme}
                openPopup={props.openPopup}
            />
        </header>

    );

}

export default Header;