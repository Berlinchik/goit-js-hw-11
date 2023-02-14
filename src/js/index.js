import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page = 1;
let per_page = 40;
let query = '';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

function onsubmit(e) {
  e.preventDefault();
  query = e.target.searchQuery.value.toLowerCase().trim();

  loadMoreBtn.classList.add('ishiden');
  gallery.innerHTML = '';
  page = 1;
  fetchPhotos(query);
  form.reset();
}

async function fetchPhotos() {
  const { data } = await instance.get('/', {
    params: {
      key: '33613361-6d492b1f5bfad6ab1d8f1666b',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page,
    },
  });
  if (!data.hits.length || query === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  renderMarkup(data);
  if (
    data.totalHits < per_page ||
    page === Math.ceil(data.totalHits / per_page)
  ) {
    loadMoreBtn.classList.add('ishiden');
    return setTimeout(() => {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }, 2000);
  }
  if (page === 1) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  loadMoreBtn.classList.remove('ishiden');
  page += 1;
}

async function renderMarkup({ hits }) {
  const markup = await hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
      <a class="gallery__item" href = "${largeImageURL}">
    <img class = "gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes:</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views:</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments:</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b>
        ${downloads}
      </p>
    </div>
    </a>
  `
  );
  gallery.insertAdjacentHTML('beforeend', markup.join(''));
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();

  if (page > 2) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

form.addEventListener('submit', onsubmit);

loadMoreBtn.addEventListener('click', () => {
  fetchPhotos();
});
