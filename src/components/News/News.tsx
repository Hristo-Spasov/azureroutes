import { useQuery } from "react-query";
import style from "./News.module.scss";
import { useEffect, useState } from "react";
import NewsModal from "./NewsModal";
import fetchNews from "../../utils/fetchNews";

const News = () => {
  const [news, setNews] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { data: cachedNews, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchNews(),
    enabled: false,
    onSuccess: (data) => setNews(data),
  });

  useEffect(() => {
    if (cachedNews) {
      setNews(cachedNews);
    }
  }, [cachedNews]);

  useEffect(() => {
    console.log(news);
  }, [news]);

  const handleModal = (article: any) => {
    setIsOpen(!isOpen);
    setSelectedArticle(article);
    console.log(isOpen);
  };

  return (
    <section className={style.news_section}>
      <h2>Latest News</h2>
      <button onClick={() => refetch()}>click</button>

      <div className={style.news_container}>
        {news?.results.map((article: any) => (
          <>
            <div className={style.news_card} key={article.article_id}>
              <img src={article.image_url} alt="" />
              <h3>{article.title}</h3>
              <span className={style.lower_card}>
                <button type="button" onClick={() => handleModal(article)}>
                  Read more...
                </button>
                <p>{article.pubDate}</p>
              </span>
            </div>
          </>
        ))}
      </div>
      <NewsModal hasCloseBtn={true} isOpen={isOpen} onClose={handleModal}>
        <img src={selectedArticle?.image_url} alt="" />
        <h3>{selectedArticle?.title}</h3>
      </NewsModal>
    </section>
  );
};

export default News;
