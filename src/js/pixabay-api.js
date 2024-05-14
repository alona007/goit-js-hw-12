import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43833375-8d3f0c892462ae71a1cd36e3a';

export const fetchPhotoByQuery = q => {
  const searchParams = new URLSearchParams({
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 18,
  });
  return fetch(`${BASE_URL}?key=${API_KEY}&${searchParams}`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      return data.hits;
    });
};