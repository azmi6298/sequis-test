import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import CardHome from "@/components/CardHome";
import CardFeatured from "@/components/CardFeatured";
import Navbar from "@/components/Navbar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  // get category id if redirect from article detail page
  const router = useRouter();
  const {
    query: { categoryId },
  } = router;

  const [isShowMoreArticles, setIsShowMoreArticles] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [articlesByCategory, setArticlesByCategory] = useState([]);

  // SWR to fetch articles.json
  const { data: articles, error } = useSWR("/api/articles", fetcher);

  useEffect(() => {
    if (categoryId) {
      const filteredArticle = articles.filter(
        (article) => article.categories.id == categoryId
      );
      setArticlesByCategory(filteredArticle);
    }
  }, []);

  useEffect(() => {
    if (selectedCategoryId != 0) {
      const filteredArticle = articles.filter(
        (article) => article.categories.id == selectedCategoryId
      );
      setArticlesByCategory(filteredArticle);
    } else {
      setArticlesByCategory([]);
    }
  }, [articles, selectedCategoryId]);

  if (error)
    return (
      <div className="flex h-screen w-full text-4xl font-bold justify-center items-center">
        Failed to load data
      </div>
    );
  if (!articles)
    return (
      <div className="flex h-screen w-full text-4xl font-bold justify-center items-center">
        Loading..
      </div>
    );

  const notFeaturedArticles = articles
    .filter((article) => !article.is_featured)
    .sort((a, b) => a.created_at - b.created_at);

  const featuredArticles = articles
    .filter((article) => article.is_featured)
    .slice(0, 3);

  const articleLimit = isShowMoreArticles ? notFeaturedArticles.length : 10;
  const indexArticles =
    articlesByCategory.length == 0
      ? notFeaturedArticles.slice(0, articleLimit)
      : articlesByCategory;

  return (
    <>
      <Head>
        <title>Sequis Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Articles */}
        <Navbar
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
        <div className="flex flex-col my-12 px-8 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-y-12">
            {/* Card */}
            {indexArticles.map((article) => (
              <Link href={`/articles/${article.id}`} key={article.id}>
                <CardHome articleData={article} />
              </Link>
            ))}
          </div>

          <button
            className="border border-black py-6 px-8 uppercase self-center my-12"
            onClick={() => setIsShowMoreArticles(!isShowMoreArticles)}
          >
            {isShowMoreArticles ? "Less " : "More "}
            Articles
          </button>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center bg-black text-white py-12 gap-y-6 text-center">
          <span className="text-4xl font-bold">Empowering Minds</span>
          <span className="text-gray-400 px-8 text-xl lg:px-0">
            Insights and Strategies for Personal and Professional Growth
          </span>

          <div className="grid lg:grid-cols-3 justify-items-center gap-12 px-12">
            {featuredArticles.map((article) => (
              <Link href={`/articles/${article.id}`} key={article.id}>
                <CardFeatured articleData={article} key={article.id} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
