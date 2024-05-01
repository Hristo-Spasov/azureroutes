import { NewsDataType, NewsResponse } from "../types/news_types";
import fetchData from "./fetchData";

const apiKey = import.meta.env.VITE_SERVER_KEY;

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "api-key": apiKey,
  },
};

const fetchNews = async () => {
  const data = await fetchData<NewsResponse<NewsDataType>>({
    url: `http://localhost:3000/api/v1/news/`,
    options: options,
  });
  return data;
};

export default fetchNews;
