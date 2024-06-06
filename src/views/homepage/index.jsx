import  { useState } from "react";
import HeroImage from "../../assets/img/hero/hero.jpg";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="w-full">
        <nav className="bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href="#beranda" className="text-white text-3xl font-bold">
                    Eco Coins
                  </a>
                </div>
              </div>
              <div className="hidden md:block ml-auto">
                <div className="flex items-baseline space-x-4">
                  <a
                    href="#beranda"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Beranda
                  </a>
                  <a
                    href="#profil"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Tentang Kami
                  </a>
                  <a
                    href="#dropdown"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Kontak
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
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Beranda
              </a>
              <a
                href="#profil"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Tentang Kami
              </a>
              <a
                href="#dropdown"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dropdown
              </a>
            </div>
          </div>
        </nav>

        <div className="px-5  max-w-7xl mx-auto flex flex-col gap-y-10 lg:flex-row items-center gap-x-10 justify-center py-10 lg:py-14">
          <div className="lg:w-[650px] lg:px-5 flex flex-col gap-y-5">
            <h1 className="text-4xl md:text-5xl xl:text-[60px] leading-[1.2] md:max-w-xl md:mx-auto md:text-center lg:text-left lg:mx-0 lg:max-w-full font-semibold dark:text-white">
              Selamat Datang di{" "}
              <span className="text-green-600">ECO COINS</span>
            </h1>
            <p className="text-md md:max-w-xl md:mx-auto lg:mx-0 lg:max-w-full md:text-center lg:text-left  text-gray-700 dark:text-white leading-relaxed mb-6">
              Bergabunglah dengan kami dalam menciptakan lingkungan yang lebih
              bersih dan berkelanjutan. Dengan Eco Coins, Anda bisa mengelola
              sampah dengan mudah dan mendapatkan imbalan yang menarik.
            </p>
            <div className="flex gap-x-5 flex-col gap-y-2.5 lg:flex-row">
              <a
                href="/auth"
                className="flex w-full lg:w-fit items-center text-white justify-center rounded-lg bg-green-600 px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
              >
                <span>Mulai Sekarang</span>
              </a>
            </div>
          </div>
          <div className="hero-image md:px-5 lg:px-0 w-full lg:w-1/2 rounded-3xl md:pt-2 lg:pt-0 relative isolate z-10">
            <img className="rounded-3xl w-full" src={HeroImage} alt="" />
          </div>
        </div>

        <section id="profil" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-white lg:text-3xl">
              Tentang Kami
            </h2>
            <div className="mt-8 text-justify">
              <p className="text-lg text-gray-700 dark:text-white leading-relaxed mb-6">
                Eco Coins adalah platform yang bertujuan untuk membantu Anda
                mengelola sampah dengan cara yang lebih berkelanjutan dan
                menguntungkan. Dengan Eco Coins, Anda dapat dengan mudah mendaur
                ulang sampah Anda tanpa ribet. Kami menyediakan fasilitas untuk
                memasukkan jenis dan berat sampah Anda, dan dalam sekejap, Anda
                akan mendapatkan insentif berupa koin yang dapat ditukar dengan
                hadiah atau uang tunai. Kami percaya bahwa berkontribusi pada
                lingkungan yang lebih baik haruslah menjadi pengalaman yang
                mudah dan bermanfaat bagi semua orang. Dengan Eco Coins, Anda
                tidak hanya membantu mengurangi limbah yang mencemari
                lingkungan, tetapi juga memiliki kesempatan untuk mendapatkan
                manfaat dari upaya Anda.
              </p>
            </div>
          </div>

          <div className="border p-6 bg-green-600 text-white flex flex-col md:flex-row justify-center items-center mx-auto">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-center text-3xl font-bold">Visi</h2>
              <ul className="list-decimal p-10 py-4">
                <li>
                  Menjadi sumber utama pengetahuan, solusi, dan insentif untuk
                  pengelolaan sampah yang berkelanjutan secara global.
                </li>
                <li className="text-justify">
                  Memberikan informasi edukatif yang mudah diakses tentang
                  pentingnya pengelolaan sampah yang baik terhadap lingkungan
                  dan cara melakukan pemilahan serta mendaur ulang yang benar.
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-center text-3xl font-bold">Misi</h2>
              <ul className="list-decimal p-10 py-4">
                <li className="text-justify">
                  Mendorong partisipasi aktif dari masyarakat dalam upaya
                  pengelolaan sampah yang lebih baik melalui komunitas online
                  dan offline.
                </li>
                <li className="text-justify">
                  Berkolaborasi dengan organisasi lingkungan, pemerintah, dan
                  bisnis untuk memajukan praktik pengelolaan sampah yang
                  berkelanjutan dan meningkatkan kesadaran akan masalah
                  lingkungan.
                </li>
              </ul>
            </div>
          </div>

          <div className="py-12 px-4">
            <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-[150px] items-center">
              <div className="flex justify-center md:justify-end">
                <img
                  src="https://images.unsplash.com/photo-1717297808345-b740e9846158?q=80&w=856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Eco Coins"
                  className="w-full max-w-xs md:max-w-md lg:max-w-lg rounded-lg shadow-lg"
                />
              </div>

              <div className="flex flex-col items-center md:items-start px-4 md:px-0">
                <h2 className="text-3xl font-bold mb-4 text-center md:text-left text-gray-800 dark:text-white">
                  Bagaimana Kami Bekerja?
                </h2>
                <ul className="list-decimal list-inside text-lg space-y-2  dark:text-gray-300">
                  <li>Registrasi dan pembuatan akun pengguna</li>
                  <li>Penjemputan sampah dari pengguna</li>
                  <li>Penimbangan dan perhitungan koin</li>
                  <li>Penukaran koin atau nilai sampah</li>
                  <li>Pengelolaan sampah berkelanjutan</li>
                  <li>Peningkatan berkelanjutan</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-10  mt-12 bg-[#FF914D] grid grid-cols-3 md:grid-cols-6 gap-4 justify-items-center align-items-center">
            <div className="border rounded-full w-[120px] h-[120px] flex items-center justify-center flex-col relative text-center">
              <i className="fas fa-recycle text-4xl text-white"></i>
              <div className="border bg-white rounded-full px-2 absolute left-1/2 transform -translate-x-1/2 -top-3">
                1
              </div>
            </div>
            <div className="border rounded-full w-[120px] h-[120px] flex items-center justify-center flex-col relative text-center">
              <i className="fas fa-weight-hanging text-4xl text-white"></i>
              <div className="border bg-white rounded-full px-2 absolute left-1/2 transform -translate-x-1/2 -top-3">
                2
              </div>
            </div>
            <div className="border rounded-full w-[120px] h-[120px] flex items-center justify-center flex-col relative text-center">
              <i className="fas fa-coins text-4xl text-white"></i>
              <div className="border bg-white rounded-full px-2 absolute left-1/2 transform -translate-x-1/2 -top-3">
                3
              </div>
            </div>
            <div className="border rounded-full w-[120px] h-[120px] flex items-center justify-center flex-col relative text-center">
              <i className="fas fa-wallet text-4xl text-white"></i>
              <div className="border bg-white rounded-full px-2 absolute left-1/2 transform -translate-x-1/2 -top-3">
                4
              </div>
            </div>
            <div className="border rounded-full w-[120px] h-[120px] flex items-center justify-center flex-col relative text-center">
              <i className="fas fa-hand-holding-usd text-4xl text-white"></i>
              <div className="border bg-white rounded-full px-2 absolute left-1/2 transform -translate-x-1/2 -top-3">
                5
              </div>
            </div>
            <div className="border rounded-full w-[120px] h-[120px] flex items-center justify-center flex-col relative text-center">
              <i className="fas fa-piggy-bank text-4xl text-white"></i>
              <div className="border bg-white rounded-full px-2 absolute left-1/2 transform -translate-x-1/2 -top-3">
                6
              </div>
            </div>
          </div>
        </section>

        <section id="kontak" className="bg-white py-2">
          <div className="container mx-auto px-4">
            <p className="text-center font-semibold mb-4">
              *Jangkauan Bank sampah yang luas merubah sampah menjadi sumber
              daya berharga
            </p>
            <div className="flex flex-col items-center mb-8">
              <h2 className="font-bold text-2xl flex items-center">
                <i className="fa-solid fa-location-dot mr-2 text-green-600"></i>
                Bogor, Jawa Barat, Indonesia
              </h2>
            </div>

            <div className="flex justify-center mb-8">
              <div className="flex items-center">
                <i className="fa-solid fa-phone-volume mr-2"></i>
                <p>(123) 345-78-90</p>
              </div>
              <div className="flex items-center mx-5">
                <i className="fa-solid fa-phone mr-2"></i>
                <p>+62 8893-3344-3455</p>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-envelope mr-2"></i>
                <p>Info@Website.com</p>
              </div>
            </div>

            <div className="max-w-full mb-20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63441.29497519786!2d106.62160192167968!3d-6.383555000000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5bba865b177%3A0x8d142dbdffc8e20f!2sBank%20Sampah%20Induk%20(Bsi)%20Mandiri%20Sehati!5e0!3m2!1sid!2sid!4v1717692001051!5m2!1sid!2sid"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
    </>
  );
}

export default HomePage;
