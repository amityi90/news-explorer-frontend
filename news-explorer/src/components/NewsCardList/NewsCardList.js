import NewsCard from "../NewsCard/NewsCard";

function NewsCardList(props) {
    return (
        <section className="news-card-list">
            <section className="news-card-list__cards">
                {!props.savedNews && <h1 className="news-card-list__title">Search results</h1>}
                <NewsCard savedNews={props.savedNews}/>
                <NewsCard savedNews={props.savedNews}/>
                <NewsCard savedNews={props.savedNews}/>
                <NewsCard savedNews={props.savedNews}/>
                <NewsCard savedNews={props.savedNews}/>
                <NewsCard savedNews={props.savedNews}/>
                <NewsCard savedNews={props.savedNews}/>
                {
                    //the cards are just simulating for this stage.
                    // props.cards.map((card) => {
                    //     return (
                    //     <NewsCard />
                    // );
                    // })
                }
            </section>
            {!props.savedNews && <button className="news-card-list__button">Show more</button>}
        </section>
    );
}

export default NewsCardList;