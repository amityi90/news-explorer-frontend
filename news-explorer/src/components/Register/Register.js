import React, { useCallback } from "react";

function Register(props) {

    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegistration(values);
        resetForm();
    }

    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >
            <button className="form__close-button" onClick={props.onClose} />
            <h2 className="form__title">{props.setTo}</h2>
            <label className="form__label">Email</label>
            <input className="form__input"
                onChange={handleChange}
                name="email"
                placeholder="Enter email"
                required
                type="email"
            />
            <span className="form__validator">{errors["email"]}</span>
            <label className="form__label">Password</label>
            <input className="form__input"
                onChange={handleChange}
                name="password"
                placeholder="Enter password"
                required
                type="password"
            />
            <span className="form__validator">{errors["password"]}</span>
            <label className="form__label">Username</label>
            <input className="form__input"
                onChange={handleChange}
                name="name"
                placeholder="Enter your username"
                required
                type="text"
            />
            <span className="form__validator form__validator_of_username">{errors["username"]}</span>
            <button className={`form__submit-button ${!isValid && "form__submit-button_disabled"}`}>{props.setTo}</button>
            <p className="form__link-suggestion">or
                <span
                    onClick={props.changePopup}
                    className="form__link"
                >{" Sign in"}</span>
            </p>
        </form>
    );
}

export default Register;
