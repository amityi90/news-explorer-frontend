function NewsCard(props) {
    return (
        <div className="news-card">
            <section className="news-card__image-container">
                <p className={`news-card__topic news-card__item ${props.savedNews ? "" : "news-card__item_hidden"}`}>{"Nature"}</p>
                {props.savedNews ?
                    <div className="news-card__button-container">
                        <p className={`news-card__button-description news-card__item ${props.savedNews ? "" : "news-card__item_hidden"}`}>{"Remove from saved"}</p>
                        <button className="news-card__button news-card__button_delete news-card__item"></button>
                    </div> :
                    <button className="news-card__button news-card__button_save news-card__item"></button>}
            </section>
            <article className="news-card__content-container">
                <p className="news-card__date">{"November 4, 2020"}</p>
                <h2 className="news-card__title">{"Everyone Needs a Special 'Sit Spot' in Nature"}</h2>
                <p className="news-card__text">{"Ever since I read Ritial eeeeeeeeeeee Ever sichard Louv's influennchard Louv's influennchard Louv's influennchard Louv's influenntial book Ever sintial book Ever ntial bntial book Ever siook Ever sisinLouv's influential book Ever since I read Richard Louv's influential book Ever since I read Richard Louv's influential book Ever since I read Richard Louv's influential book Ever since I read Richard Louv's influential book"}</p>
                <p className="news-card__author">{"national geographic"}</p>
            </article>
        </div>
    );
}

export default NewsCard;