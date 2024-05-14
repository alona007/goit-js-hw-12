import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotoByQuery } from './js/pixabay-api';
import { galleryItemsMarkUp } from './js/render-functions';

const formElement = document.querySelector('#searchform');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');

const addFont = document.head.insertAdjacentHTML(
  'beforeend',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>'
);

function onSearchFormSubmit(event) {
  event.preventDefault();
  const { value: searchQuery } = event.target.elements.searchinput;

  galleryElement.innerHTML = '';
  loaderElement.classList.remove('is-hidden');

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: "Sorry, input field can't be empty",
      position: 'topRight',
    });
    return;
  }

  fetchPhotoByQuery(searchQuery)
    .then(ImagesData => {
      galleryElement.innerHTML = galleryItemsMarkUp(ImagesData);
    })
    .catch(error => {
      console.error('Error fetching photos:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch photos. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      event.target.reset();
      loaderElement.classList.add('is-hidden');
      const lightBox = new SimpleLightbox('.gallery-item-image a');
    });
}

formElement.addEventListener('submit', onSearchFormSubmit);