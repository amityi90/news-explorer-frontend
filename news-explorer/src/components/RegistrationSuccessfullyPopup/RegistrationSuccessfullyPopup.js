function RegistrationSuccessfullyPopup (props) {
    return (
        <div className="Registration-successfully-popup form">
                <button className="form__close-button" onClick={props.onClose} />
                <h2 className="form__title">"Registration successfully completed!"</h2>
                <span
                    onClick={props.changePopup}
                    className="form__link"
                >Sign in</span>
            </div>
    );
}

export default RegistrationSuccessfullyPopup;