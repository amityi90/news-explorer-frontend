function PopupWithForm(props) {
    return (
        <section className={`form__container ${props.isOpen ? "" : "form__container_close"}`}>
            <form className="form">
                <button className="form__close-button" onClick={props.onClose} />
                <h2 className="form__title">{props.setTo}</h2>
                <label className="form__label">Email</label>
                <input className="form__input" placeholder="Enter email" />
                <span className="form__validator">validation</span>
                <label className="form__label">Password</label>
                <input className="form__input" placeholder="Enter password" />
                <span className="form__validator">validation</span>
                {props.setTo === "Sign up" && <label className="form__label">Username</label>}
                {props.setTo === "Sign up" && <input className="form__input" placeholder="Enter your username" />}
                {props.setTo === "Sign up" && <span className="form__validator form__validator_of_username">validation</span>}
                <button className="form__submit-button">{props.setTo}</button>
                <p className="form__link-suggestion">or
                    <span
                        onClick={props.changePopup}
                        className="form__link"
                    >{props.setTo === "Sign in" ? " Sign up" : " Sign in"}</span>
                </p>
            </form>
        </section>
    );
}

export default PopupWithForm;