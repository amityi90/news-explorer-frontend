import React, { useState } from 'react';
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList(props) {

    const [numberOfCards, setNumberOfCards] = React.useState(3);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function showMoreCards() {
        setNumberOfCards(numberOfCards + 3);
    }


    return (
        <section className="news-card-list">
            {props.savedNews && <section className="news-card-list__cards">
                {
                    props.cardsList.map((card, i) => {
                        return (
                            <NewsCard
                                handleDeleteArticle={props.handleDeleteArticle}
                                handleSaveArticle={props.handleSaveArticle}
                                key={i}
                                cardInfo={card}
                                savedNews={props.savedNews}
                            />
                        );
                    })
                }
            </section>}
            {!props.savedNews && <section className="news-card-list__cards">
                <h1 className="news-card-list__title">Search results</h1>
                {
                    props.cardsList.map((card, i) => {
                        card.date = `${card.publishedAt.slice(8, 10)}   ${monthNames[(parseInt(card.publishedAt.slice(5, 7))) - 1]},    ${card.publishedAt.slice(0, 4)}`
                        return (
                            <NewsCard
                                openPopup={props.openPopup}
                                savedArticles={props.savedArticles}
                                handleSaveArticle={props.handleSaveArticle}
                                handleDeleteArticle={props.handleDeleteArticle}
                                key={i}
                                loggedIn={props.loggedIn}
                                cardInfo={card}
                            />
                        );
                    }).slice(0, numberOfCards)
                }
            </section>}
            {!props.savedNews &&
                <button
                    className="news-card-list__button"
                    onClick={showMoreCards}
                >Show more</button>}
        </section>
    );
}

export default NewsCardList;