function sortKeywords(cardsList) {
    const justKeywords = cardsList.map((card) => card.keyword);
    justKeywords.sort();
    let counter = 0;
    let keywords = [];
    for (let i = 0; i < justKeywords.length; i++) {
        counter++;
        if (justKeywords[i] !== justKeywords[i + 1]) {
            keywords.push([justKeywords[i], counter])
            counter = 0;
        }
    }
    keywords = keywords.sort((a, b) => { return b[1] - a[1] });

    if (keywords.length === 1) {

        return `${keywords[0][0]}`;

    } else if (keywords.length === 2) {

        return `${keywords[0][0]} and ${keywords[1][0]}`;

    } else if (keywords.length === 3) {

        return `${keywords[0][0]}, ${keywords[1][0]} and ${keywords[2][0]}`;

    } else if (keywords.length > 3) {

        return `${keywords[0][0]}, ${keywords[1][0]} and ${keywords.length - 2}`;
    }

}

export default sortKeywords;