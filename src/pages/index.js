import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";

import Navbar from "@/components/Navbar";
import CardHome from "@/components/CardHome";
import CardFeatured from "@/components/CardFeatured";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: articles, error } = useSWR("/api/articles", fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!articles) return <div>Loading..</div>;

  const featuredArticles = articles
    .filter((article) => article.is_featured)
    .slice(0, 3);

  return (
    <>
      <Head>
        <title>Sequis Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        {/* Articles */}
        <div className="flex flex-col my-12 px-8 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12">
            {/* Card */}
            {articles.map((article) => (
              <CardHome articleData={article} key={article.id} />
            ))}
          </div>

          <span className="border border-black py-6 px-8 uppercase self-center my-12">
            More Articles
          </span>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center bg-black text-white py-12 gap-y-6 text-center">
          <span className="text-4xl font-bold">Empowering Minds</span>
          <span className="text-gray-400 px-8 text-xl lg:px-0">
            Insights and Strategies for Personal and Professional Growth
          </span>

          <div className="grid lg:grid-cols-3 gap-12 px-12">
            {featuredArticles.map((article) => (
              <CardFeatured articleData={article} key={article.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
