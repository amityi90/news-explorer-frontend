class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    setHeaders(headers) {
        this._headers = headers;
    }

    getHeaders() {
        return this._headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    register({ name, email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            })
        })
            .then(res => this._getResponseData(res));
    }

    login({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then(res => this._getResponseData(res));
    }

    addToken(token) {
        this._headers = {
            ...this._headers,
            "Authorization": `Bearer ${token}`
        }
        this._token = token;
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => this._getResponseData(res));
    }

    getSavedArticles() {
        return fetch(`${this._baseUrl}/articles`, {
            method: "GET",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }

    saveArticle(articleData) {
        return fetch(`${this._baseUrl}/articles`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(articleData)
        })
            .then(res => this._getResponseData(res));
    }

    deleteArticle(articleId) {
        return fetch(`${this._baseUrl}/articles/${articleId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => this._getResponseData(res));
    }
}

const mainApi = new MainApi({
    baseUrl: "https://api.news-explorer-am.students.nomoreparties.sbs",
    headers: {
        "Content-Type": "application/json"
    }
});

export default mainApi;