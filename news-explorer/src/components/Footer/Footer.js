import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&#169; 2021 Supersite, Powered by News API</p>
            <nav className="footer__navigator">
                <Link to="/" className="footer__link">Home</Link>
                <a className="footer__link" href="https://practicum.yandex.com">Practicum by Yandex</a>
                <div className="footer__personal-links-container">
                    <a className="footer__personal-link footer__personal-link_to_github" href="https://github.com/amityi90" />
                    <a className="footer__personal-link footer__personal-link_to_linkedin" href="https://www.linkedin.com/in/amit-mottes-a909b021b/" />
                </div>
            </nav>
        </footer>
    );
}

export default Footer;