import Login from "../Login/Login";
import Register from "../Register/Register";
import RegistrationSuccessfullyPopup from "../RegistrationSuccessfullyPopup/RegistrationSuccessfullyPopup";

function PopupWithForm(props) {
    return (
        <section className={`form__container ${props.isOpen ? "" : "form__container_close"}`}>
            {props.setTo === "Sign up successfully" && <RegistrationSuccessfullyPopup changePopup={props.changePopup} />}
            {props.setTo === "Sign up" && <Register
                handleRegistration={props.handleRegistration}
                changePopup={props.changePopup}
                onClose={props.onClose}
                setTo={props.setTo}
            />}
            {props.setTo === "Sign in" && <Login
                handleLogin={props.handleLogin}
                changePopup={props.changePopup}
                onClose={props.onClose}
                setTo={props.setTo}
            />}
        </section>
    );
}

export default PopupWithForm;