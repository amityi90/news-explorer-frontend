import React, { useState } from 'react';

function NewsCard(props) {

    const [isSaved, setIsSaved] = useState(props.isCardSaved);

    function handleDeleteArticleClick(e) {
        e.preventDefault();
        setIsSaved(false);
        props.handleDeleteArticle(props.cardInfo);
    }

    function handleSaveArticleClick(e) {
        e.preventDefault();
        if (!props.loggedIn) {
            props.openPopup("Sign up");
        } else if (isSaved) {
            handleDeleteArticleClick(e);
        } else {
            props.handleSaveArticle(props.cardInfo);
            setIsSaved(true);
        }
    }

    React.useEffect(() => {
        if (!props.savedNews) {
            props.savedArticles.forEach(article => {
                if (article.link === props.cardInfo.url) {
                    setIsSaved(true);
                }
            });
        }
    }, [])

    return (
        <a className="news-card" href={props.savedNews ? props.cardInfo.link : props.cardInfo.url}>
            <section className="news-card__image-container" style={{ backgroundImage: `url(${props.savedNews ? props.cardInfo.image : props.cardInfo.urlToImage})` }}>
                <p className={`news-card__topic news-card__item ${props.savedNews ? "" : "news-card__item_hidden"}`}>{props.cardInfo.keyword}</p>
                {
                    props.savedNews ?
                        <div className="news-card__button-container">
                            <p className={`news-card__button-description news-card__item ${props.savedNews ? "" : "news-card__item_hidden"}`}>{"Remove from saved"}</p>
                            <button className="news-card__button news-card__button_delete news-card__item" onClick={handleDeleteArticleClick}></button>
                        </div> :
                        <div className="news-card__button-container">
                            {!props.loggedIn && <p className={`news-card__button-description news-card__item ${props.loggedIn ? "" : "news-card__item_hidden"}`}>{"Sign in to save articles"}</p>}
                            <button className={`news-card__button news-card__button_save news-card__item ${isSaved ? "news-card__button_save_is-saved" : ""}`} onClick={handleSaveArticleClick}></button>
                        </div>
                }
            </section>
            <article className="news-card__content-container">
                <p className="news-card__date">{props.cardInfo.date}</p>
                <h2 className="news-card__title">{props.cardInfo.title}</h2>
                <p className="news-card__text">{props.savedNews ? props.cardInfo.text : props.cardInfo.description}</p>
                <p className="news-card__author">{props.savedNews ? props.cardInfo.source : props.cardInfo.source.name}</p>
            </article>
        </a>
    );
}

export default NewsCard;