import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Navbar({ selectedCategoryId, setSelectedCategoryId }) {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const { data: categories, error } = useSWR("/api/categories", fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!categories) return <div>Loading..</div>;

  const allCategories = [
    {
      id: 0,
      title: "All Articles",
    },
    ...categories,
  ];

  return (
    <>
      {/* Navbar web */}
      <div className="w-full hidden lg:flex justify-between px-24">
        <Link href={"/"} className="text-3xl font-semibold bg-orange-500 p-8">
          Logo
        </Link>
        <div className="my-4">
          <div className="grid grid-cols-3 justify-items-start font-semibold gap-y-4">
            {allCategories.map((cat) => (
              <div key={cat.id} className="mr-24">
                <span
                  className={`cursor-pointer ${
                    cat.id == selectedCategoryId ? "text-orange-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                  }}
                >
                  {cat.title}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <hr className="w-48 h-1 bg-black" key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Navbar mobile */}
      {isNavbarOpen ? (
        <div className="w-full">
          <p
            onClick={() => {
              setNavbarOpen(!isNavbarOpen);
            }}
            className="text-end text-2xl font-bold text-orange-500 cursor-pointer mr-4 mt-4"
          >
            X
          </p>
          <div className=" h-screen flex flex-col items-center justify-center text-center font-semibold text-2xl">
            {allCategories.map((cat) => (
              <div key={cat.id} className="mb-4">
                <span
                  className={`cursor-pointer ${
                    cat.id == selectedCategoryId ? "text-orange-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setNavbarOpen(!isNavbarOpen);
                  }}
                >
                  {cat.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="justify-between flex lg:hidden">
          <Link href={"/"} className="text-3xl font-semibold bg-orange-500 p-8">
            Logo
          </Link>
          <button
            onClick={() => {
              setNavbarOpen(!isNavbarOpen);
            }}
            className="mr-4"
          >
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="15"></rect>
              <rect y="30" width="100" height="15"></rect>
              <rect y="60" width="100" height="15"></rect>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
