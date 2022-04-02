function Preloader(props) {
    return (
        <div className="preloader">
            {!props.notFound && <i className="preloader__circle" />}
            <p className="preloader__text">{props.notFound ? "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later." : "Searching for news..."}</p>
        </div>
    );
}

export default Preloader;