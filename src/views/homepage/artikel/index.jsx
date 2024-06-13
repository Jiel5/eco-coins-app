// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "/logo/logo3.png";

function Artikel() {
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

      <section id="artikel" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src="https://www.cleanipedia.com/images/5h1w0177knh8/SuNG6NDnEShZVzexeP0MZ/f2ac9884fb251f27ae44057def5b490e/MDguX0NsZWFuaXBlZGlhX0p1bGlfMjAyMl9IZWFkZXIuanBn/600w/orang-membuang-sesuatu-di-tempat-sampah.avif"
            alt="Kebersihan Lingkungan"
            className="w-full h-auto object-cover rounded-md shadow-lg mb-8 max-h-[600px]"
          />

          <div className="rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Jaga Kebersihan Mulai Dari Lingkungan Sekitar Kita
            </h2>
            <div className="flex items-center text-gray-600 mb-2">
              <i className="fas fa-user-circle mr-2"></i>
              <p className="mr-4">Muhamad Zaki Raihan</p>
              <i className="far fa-calendar-alt mr-2"></i>
              <p>Rabu, 13 Juni 2024</p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Kebersihan lingkungan merupakan aspek yang sangat penting dalam
              menjaga kesehatan dan kelestarian alam. Lingkungan yang bersih
              tidak hanya memengaruhi kesehatan fisik manusia, tetapi juga
              mempertahankan keanekaragaman hayati dan keseimbangan ekosistem
              secara keseluruhan.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Dalam konteks perkotaan maupun pedesaan, upaya menjaga kebersihan
              lingkungan harus menjadi tanggung jawab bersama. Sampah-sampah
              yang tidak tertangani dengan baik dapat menyebabkan pencemaran air
              dan udara, serta berdampak buruk terhadap kualitas hidup
              masyarakat sekitar. Oleh karena itu, perlunya kesadaran dan aksi
              nyata dari setiap individu untuk mengurangi sampah plastik,
              mengelola limbah dengan benar, serta berpartisipasi dalam kegiatan
              penghijauan dan pembersihan lingkungan sangatlah penting.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Selain itu, kebersihan lingkungan juga berkontribusi dalam
              menciptakan lingkungan yang aman dan nyaman untuk generasi yang
              akan datang. Dengan menjaga kebersihan di lingkungan sekitar, kita
              tidak hanya memberikan manfaat jangka pendek, tetapi juga
              memberikan warisan berharga bagi anak cucu kita untuk menikmati
              kehidupan yang lebih baik dan sehat di masa depan.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Untuk mencapai tujuan ini, langkah-langkah sederhana seperti
              mengurangi penggunaan plastik sekali pakai, membuang sampah pada
              tempatnya, dan mendukung praktik daur ulang sangatlah penting.
              Edukasi dan kesadaran masyarakat juga perlu ditingkatkan agar
              perilaku yang ramah lingkungan dapat menjadi bagian dari gaya
              hidup sehari-hari.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Dengan semua pihak yang terlibat berkolaborasi untuk melindungi
              lingkungan, kita dapat meninggalkan warisan yang lebih baik bagi
              generasi mendatang. Semua tindakan kita hari ini memiliki dampak
              jangka panjang dalam mewujudkan dunia yang lebih bersih, sehat,
              dan berkelanjutan.
            </p>
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

export default Artikel;
