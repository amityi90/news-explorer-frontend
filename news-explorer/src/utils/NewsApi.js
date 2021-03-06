export default function getNews(keyword) {
    const currentDate = new Date();
    const weekAgoDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
    const currentDateSendFormat = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const weekAgoDateSendFormat = `${weekAgoDate.getFullYear()}-${weekAgoDate.getMonth() + 1}-${weekAgoDate.getDate()}`;
    const apiKey = '72da70afb5f84c91928179f8f266e126';

    const url = 'https://nomoreparties.co/news/v2/top-headlines?' +
        `q=${keyword}&` +
        `from=${weekAgoDateSendFormat}&` +
        `to=${currentDateSendFormat}&` +
        `sortBy=publishedAt&` +
        `pageSize=100&` +
        `apiKey=${apiKey}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Error: ${response.status}`);
            }
            return response.json();
        });
}