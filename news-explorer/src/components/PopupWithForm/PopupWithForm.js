function PopupWithForm(props) {
    return (
        <section className={`form__container ${props.isOpen ? "" : "form__container_close"}`}>
            {props.children}
        </section>
    );
}

export default PopupWithForm;