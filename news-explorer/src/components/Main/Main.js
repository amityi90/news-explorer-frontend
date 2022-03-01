import SearchForm from "../SerchForm/SerchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import getNews from '../../utils/NewsApi';
import Preloader from "../Preloader/Preloader";
import React, { useState } from 'react';




function Main(props) {

    const [renderPreloader, setRenderPreloader] = React.useState(false);
    const [renderNotFound, setRenderNotFound] = React.useState(false);
    const [cardsList, setCardsList] = React.useState([]);

    function handelFormSubmit(keyword) {
        setRenderNotFound(false);
        props.setRenderCards(false);
        setRenderPreloader(true);
        getNews(keyword)
            .then((data) => {
                if (data.status !== 'ok') {
                    setRenderNotFound(true);
                } else {
                    console.log(data);
                    setCardsList(data.articles);
                    localStorage.setItem('newsArticles', JSON.stringify(data.articles));
                    localStorage.setItem('keyword', keyword);
                    setRenderPreloader(false);
                    props.setRenderCards(true);
                }
            })
    }

    React.useEffect(() => {
        if (localStorage.getItem('newsArticles')) {
            setCardsList(JSON.parse(localStorage.getItem('newsArticles')));
            props.setRenderCards(true);
        }
    }, [])

    return (
        <main className="main">
            <SearchForm
                handelFormSubmit={handelFormSubmit}
            />
            {renderPreloader &&
                <Preloader
                    notFound={renderNotFound}
                />}
            {props.renderCards &&
                <NewsCardList
                    openPopup={props.openPopup}
                    savedArticles={props.savedArticles}
                    handleSaveArticle={props.handleSaveArticle}
                    handleDeleteArticle={props.handleDeleteArticle}
                    loggedIn={props.loggedIn}
                    cardsList={cardsList}
                />}
            <About />
        </main>
    );
}

export default Main;