import fetchData from "./fetchData";

interface ApiResponse<T> {
  data: T[];
}
const BASE_URL = "https://newsdata.io/api/1/";
const API_KEY = "pub_41527d6d0de206640fc1f63c5573def105003";

const fetchNews = async () => {
  const data = await fetchData<ApiResponse<any>>({
    url: `${BASE_URL}news?apikey=${API_KEY}&language=en&category=tourism`,
  });
  return data;
};

export default fetchNews;
