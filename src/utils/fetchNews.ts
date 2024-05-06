import { NewsDataType, NewsResponse } from "../types/news_types";
import fetchData from "./fetchData";

const apiKey = import.meta.env.VITE_SERVER_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "api-key": apiKey,
  },
};

const fetchNews = async () => {
  const data = await fetchData<NewsResponse<NewsDataType>>({
    url: `${BASE_URL}/api/v1/news/`,
    options: options,
  });
  return data;
};

export default fetchNews;
