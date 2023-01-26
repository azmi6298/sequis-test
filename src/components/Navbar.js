import { useState } from "react";

export default function Navbar() {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      {/* Navbar web */}
      <div className="w-full hidden lg:block">
        <ul className="grid grid-cols-3 justify-items-start mx-8">
          <li>All Articles</li>
          <li>Fashion</li>
          <li>Food</li>
          <li>Travel</li>
          <li>Film</li>
          <li>Business</li>
        </ul>
      </div>

      {/* Navbar mobile */}
      {isNavbarOpen ? (
        <div className="w-full h-screen">
          <button
            onClick={() => {
              setNavbarOpen(!isNavbarOpen);
            }}
          >
            Close icon
          </button>
          <ul className="flex flex-col items-center">
            <li>All Articles</li>
            <li>Fashion</li>
            <li>Food</li>
            <li>Travel</li>
            <li>Film</li>
            <li>Business</li>
          </ul>
        </div>
      ) : (
        <div className="justify-between flex lg:hidden">
          <span>Logo</span>
          <button
            onClick={() => {
              setNavbarOpen(!isNavbarOpen);
            }}
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
