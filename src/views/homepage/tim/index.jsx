// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "/logo/logo2.png";
import imageTeam1 from "/tim/zaki.jpg"
import imageTeam2 from "/tim/jihan.jpg"
import imageTeam3 from "/tim/alwi.jpg"

function Tim() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full">
      <nav className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <img src={logo} alt="" className="mr-2" width={50} />
              <div className="flex-shrink-0">
                <a href="/" className="text-white text-3xl font-bold">
                  Eco Coins
                </a>
              </div>
            </div>
            <div className="hidden md:block ml-auto">
              <div className="flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Beranda
                </a>
                <a
                  href="/"
                  className="text-white hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Tentang Kami
                </a>

                <a
                  href="/"
                  className="text-white hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Kontak
                </a>
                <a
                  href="/tim-kami"
                  className="text-white hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Tim Kami
                </a>
                <a
                  href="/artikel"
                  className="text-white hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Artikel
                </a>
                <a
                  href="/auth"
                  className="bg-white text-green-600 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-lg text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden`}
          id="navbar-sticky"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#beranda"
              className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Beranda
            </a>
            <a
              href="#profil"
              className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Tentang Kami
            </a>
            <a
              href="#dropdown"
              className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Tim Kami
            </a>
            <a
              href="#artikel"
              className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Artikel
            </a>
            <a
              href="#artikel"
              className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Kontak
            </a>
            <a
              href="#login"
              className="bg-white text-green-600 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      <section className="bg-white  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-1">
        <div className="h-[32rem] bg-white dark:bg-gray-800">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              Tim Kami
            </h1>

            <div className="flex justify-center mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-green-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-green-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-green-500 rounded-full"></span>
            </div>

            <p className="max-w-2xl mx-auto mt-6 text-center text-gray-700 dark:text-gray-300">
              Berikut adalah tim yang telah bekerja keras. Setiap anggota
              memiliki keahlian dan dedikasi yang tinggi dalam pekerjaan mereka.
            </p>
          </div>
        </div>

        <div className="container px-6 py-10 mx-auto -mt-72 sm:-mt-80 md:-mt-96">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
            <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl dark:border-gray-700">
              <img
                className="object-cover w-full rounded-xl aspect-square"
                src={imageTeam3}
                alt=""
              />

              <h1 className="mt-4 text-2xl font-semibold text-gey-200 capitalize dark:text-white">
                Muhammad Sirujudin Alwi
              </h1>

              <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">
                Front-End Programmer
              </p>

              <div className="flex mt-3 -mx-2">
                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Reddit"
                >
                  <i className="fab fa-linkedin"></i>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Facebook"
                >
                  <i className="fab fa-github"></i>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Github"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl dark:border-gray-700">
              <img
                className="object-cover w-full rounded-xl aspect-square"
                src={imageTeam1}
                alt=""
              />

              <h1 className="mt-4 text-2xl font-semibold text-gey-200 capitalize dark:text-white">
                Muhamad Zaki Raihan
              </h1>

              <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">
                Back-End Programmer
              </p>

              <div className="flex mt-3 -mx-2">
                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Reddit"
                >
                  <i className="fab fa-linkedin"></i>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Facebook"
                >
                  <i className="fab fa-github"></i>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Github"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl dark:border-gray-700">
              <img
                className="object-cover w-full rounded-xl aspect-square"
                src={imageTeam2}
                alt=""
              />

              <h1 className="mt-4 text-2xl font-semibold text-gey-200 capitalize dark:text-white">
                Jihan Latifah
              </h1>

              <p className="mt-2 text-gray-600 capitalize dark:text-gray-300">
                Front-End Programmer
              </p>

              <div className="flex mt-3 -mx-2">
                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Reddit"
                >
                  <i className="fab fa-linkedin"></i>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Facebook"
                >
                  <i className="fab fa-github"></i>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-blue-400"
                  aria-label="Github"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-600 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">
            &copy; 2024 ECO COINS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Tim;
