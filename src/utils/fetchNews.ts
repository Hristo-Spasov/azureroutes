import { NewsDataType, NewsResponse } from "../types/news_types";
import fetchData from "./fetchData";

const BASE_URL = "https://newsdata.io/api/1/";
const API_KEY = "pub_421527d5eb357887bf3e984cbb743d5898988";

const fetchNews = async () => {
  const data = await fetchData<NewsResponse<NewsDataType>>({
    url: `${BASE_URL}news?apikey=${API_KEY}&language=en&category=tourism`,
  });
  return data;
};

export default fetchNews;
