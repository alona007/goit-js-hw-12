import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotoByQuery } from './js/pixabay-api';
import { galleryItemsMarkUp } from './js/render-functions';

const formElement = document.querySelector('#searchform');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let totalHits = 0;

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">`
);

async function fetchAndRenderPhotos(query, pageNum) {
  try {
    const { hits, totalHits: fetchedTotalHits } = await fetchPhotoByQuery(query, pageNum);
    totalHits = fetchedTotalHits;
    if (hits.length > 0) {
      galleryElement.insertAdjacentHTML('beforeend', galleryItemsMarkUp(hits));
      new SimpleLightbox('.gallery-item-image a').refresh();
      if (galleryElement.children.length < totalHits) {
        loadMoreButton.classList.remove('is-hidden');
      } else {
        loadMoreButton.classList.add('is-hidden');
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
    return hits;
  } catch (error) {
    console.error('Error fetching photos:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch photos. Please try again later.',
      position: 'topRight',
    });
    return [];
  } finally {
    loaderElement.classList.add('is-hidden');
  }
}

async function onSearchFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchinput.value.trim();
  page = 1;
  totalHits = 0;

  galleryElement.innerHTML = '';
  loadMoreButton.classList.add('is-hidden');
  loaderElement.classList.remove('is-hidden');

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: "Sorry, input field can't be empty",
      position: 'topRight',
    });
    loaderElement.classList.add('is-hidden');
    return;
  }

  await fetchAndRenderPhotos(searchQuery, page);

  // Очищення поля вводу після пошуку
  formElement.reset();
}

async function onLoadMoreButtonClick() {
  page += 1;
  const hits = await fetchAndRenderPhotos(searchQuery, page);
  if (hits.length > 0) {
    const { height: cardHeight } = galleryElement.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

formElement.addEventListener('submit', onSearchFormSubmit);
loadMoreButton.addEventListener('click', onLoadMoreButtonClick);