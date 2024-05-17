import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43833375-8d3f0c892462ae71a1cd36e3a';

export const fetchPhotoByQuery = async (q, page = 1) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch photos. Please try again later.',
      position: 'topRight',
    });
    throw error;
  }
};