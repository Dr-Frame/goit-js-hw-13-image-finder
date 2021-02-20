import pnotifyPop from './components/pnotify'

export default {
  baseUrl: 'https://pixabay.com/api/',
  apiKey: '20332919-ce65cd39cf390118f4ce6de3e',
  searchQuerry: '',
  page: 1,
  fetchGallery() {
    const url = `${this.baseUrl}?image_type=photo&orientation=horizontal&q=${this.searchQuerry}&page=${this.page}&per_page=12&key=${this.apiKey}`;

    return fetch(url)
      .then(res => res.json())
      .then((data) => {
        pnotifyPop(data.total, data.hits.length * this.page);
        this.page += 1;
        return data;
      })
      .catch(error => console.log(error));
  },
  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuerry;
  },

  set query(value) {
    this.searchQuerry = value;
  },
};
