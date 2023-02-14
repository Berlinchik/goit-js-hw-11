import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';

export class UnsplashAPI {
    #BASE_URL = 'https://api.unsplash.com/search/photos';

    #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
    #page;
    #query;

    #searchParams = new URLSearchParams({
        per_page: 30,
        color: 'black',
        orientation: 'portrait',
        client_id: this.#API_KEY,
    });

    constructor() {
        this.#page = 1;
        this.#query = '';
    }

    async getImages() {
        // variant 1

        // variant 2

        // variant 3
        return fetch(`${this.#BASE_URL}?query=${this.#query}&page=${this.#page}&${this.#searchParams}`).then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.statusText)
        })
    }

    get page() {
        return this.#page;
    }

    set page(newPage) {
        this.#page = newPage;
    }

    updatePage() {
        this.#page += 1;
    }

    set query(newQuery) {
        this.#query = newQuery;
    }
}
