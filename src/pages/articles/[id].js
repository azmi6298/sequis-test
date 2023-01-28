import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: article, error } = useSWR(`/api/articles/${id}`, fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!article) return <div>Loading..</div>;

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center text-center text-gray-400 ">
        <Image
          src={article.image}
          alt={article.title}
          width={1200}
          height={400}
          className="rounded-lg"
        ></Image>

        {/* paragraph */}
        <div className="px-4 lg:px-[16rem]">
          <p className="font-bold text-3xl lg:text-6xl text-black mt-12">
            {article.title}
          </p>

          <p className="text-2xl lg:text-3xl mt-12 px-8 lg:px-16">
            {article.summary}
          </p>
        </div>
        <hr className="w-[20rem] lg:w-[72rem] h-1 mx-auto border-0 rounded bg-gray-400 mt-12"></hr>

        <div className="flex flex-col text-start lg:text-2xl my-12 gap-y-12 px-12 lg:px-[22rem]">
          <p>{article.content}</p>
        </div>
      </div>
    </>
  );
}
