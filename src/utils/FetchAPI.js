import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL

const options = {
  params: {
    maxResults: 30,
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_HOST,
  },
};

export const FetchAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};