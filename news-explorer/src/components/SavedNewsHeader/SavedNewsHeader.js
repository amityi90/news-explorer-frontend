function SavedNewsHeader() {
    return (
        <article className="saved-news">
            <h2 className="saved-news__title">Saved articles</h2>
            <p className="saved-news__info">Elise, you have 5 saved articles</p>
            <p className="saved-news__keywords-info">By keywords: <span className="saved-news__topics">Nature, Yellowstone, and 2 other<span/></span></p>
        </article>
    );
}

export default SavedNewsHeader;