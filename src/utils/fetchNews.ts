import { NewsDataType, NewsResponse } from "../types/news_types";
import fetchData from "./fetchData";

const BASE_URL = "https://newsdata.io/api/1/";
const API_KEY = "pub_41527d6d0de206640fc1f63c5573def105003";

const fetchNews = async () => {
  const data = await fetchData<NewsResponse<NewsDataType>>({
    url: `${BASE_URL}news?apikey=${API_KEY}&language=en&category=tourism`,
  });
  return data;
};

export default fetchNews;
