import { useQuery } from "react-query";
import style from "./News.module.scss";
import { useEffect, useState } from "react";
// import NewsModal from "./NewsModal";
import fetchNews from "../../utils/fetchNews";
import { NewsDataType, NewsResponse } from "../../types/news_types";

const News = () => {
  const [news, setNews] = useState<NewsResponse<NewsDataType>>();
  // const observeRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedArticle, setSelectedArticle] = useState(null);

  const { data: cachedNews, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchNews(),
    enabled: false,
    onSuccess: (data) => setNews(data),
  });

  //! Intersection Observer provide the ref to the upmost div
  // const options = {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 0.5,
  // };

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         refetch(); // Refetch when element comes into view
  //       }
  //     });
  //   }, options);
  //   if (observeRef.current) observer.observe(observeRef.current);

  //   return () => {
  //     if (observeRef.current) observer.unobserve(observeRef.current);
  //   };
  // }, [observeRef, refetch]);

  useEffect(() => {
    if (cachedNews) {
      setNews(cachedNews);
    }
  }, [cachedNews]);

  //Console log
  useEffect(() => {
    console.log(news);
  }, [news]);

  // const handleModal = (article: any) => {
  //   setIsOpen(!isOpen);
  //   setSelectedArticle(article);
  //   console.log(isOpen);
  // };

  return (
    <section className={style.news_section}>
      <h2>Latest Travel News</h2>
      <button onClick={() => refetch()}>click</button>

      <div className={style.news_container}>
        {news?.results.map((article) => (
          <div className={style.news_card} key={article.article_id}>
            <img src={article.image_url} alt="" />
            <h3>{article.title}</h3>
            <p>{`${
              article.description != null
                ? article.description.slice(0, 250) + "..."
                : ""
            }`}</p>
            <span className={style.lower_card}>
              {/* <button type="button" onClick={() => handleModal(article)}>
                  Read more...
                </button> */}
              <a
                href={`${article.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more...
              </a>
              <p>{article.pubDate}</p>
            </span>
          </div>
        ))}
      </div>
      {/* <NewsModal hasCloseBtn={true} isOpen={isOpen} onClose={handleModal}>
        <img src={selectedArticle?.image_url} alt="" />
        <h3>{selectedArticle?.title}</h3>
      </NewsModal> */}
    </section>
  );
};

export default News;
