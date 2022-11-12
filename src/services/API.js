import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '0322adb5b7f04b7c7a36cb76430c0728';

export const getTrendingFilms = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${KEY}`);
  return res;
};

export const getFilmById = async movieId => {
  const res = await axios.get(`${BASE_URL}movie/${movieId}?api_key=${KEY}`);
  return res;
};

export const getCastById = async movieId => {
  const res = await axios.get(
    `${BASE_URL}movie/${movieId}/credits?api_key=${KEY}`
  );
  return res;
};

export const getReviewsById = async movieId => {
  const res = await axios.get(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${KEY}`
  );
  return res;
};

export const getFilmByQuery = async query => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${query}&page=1`
  );
  return res;
};
