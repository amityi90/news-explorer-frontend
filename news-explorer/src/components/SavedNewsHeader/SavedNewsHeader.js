import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/currentUserContext';

function SavedNewsHeader(props) {

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
            props.getSavedArticles();
      }, [])

    return (
        <article className="saved-news">
            <h2 className="saved-news__title">Saved articles</h2>
            <p className="saved-news__info">{`${currentUser.name}, you have ${props.savedArticles.length} saved articles`}</p>
            <p className="saved-news__keywords-info">By keywords: <span className="saved-news__topics">{props.keywordsSentence}<span /></span></p>
        </article>
    );
}

export default SavedNewsHeader;