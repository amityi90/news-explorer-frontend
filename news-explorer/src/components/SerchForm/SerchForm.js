import React, { useState } from 'react';

function SearchForm(props) {

    const [keyword, setKeyword] = React.useState("");
    const [placeholder, setPlaceholder] = React.useState("Enter topic");

    function handleKeywordChange(e) {
        setKeyword(e.target.value);
    }

    function submit(e) {
        e.preventDefault();
        if(!keyword) {
            setPlaceholder("Please enter a keyword");
        } else {
            setPlaceholder("Enter topic");
            props.handelFormSubmit(keyword);
            setKeyword("");
        }
    }

    return (
        <form 
        className="search-form"
        onSubmit={submit}
        >
            <h1 className="search-form__title">What's going on in the world?</h1>
            <p className="search-form__description">Find the latest news on any topic and save them in your personal account.</p>
            <div className="search-form__input-container">
                <input
                    className="search-form__input"
                    placeholder={placeholder}
                    value={keyword || ''}
                    onChange={handleKeywordChange}
                    type="text"
                />
                <button className="search-form__submit">Search</button>
            </div>
        </form>
    );
}

export default SearchForm;