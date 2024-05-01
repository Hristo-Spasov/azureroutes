import { NewsDataType, NewsResponse } from "../types/news_types";
import fetchData from "./fetchData";

const fetchNews = async () => {
  const data = await fetchData<NewsResponse<NewsDataType>>({
    url: `http://localhost:3001/api/v1/news/`,
  });
  return data;
};

export default fetchNews;
