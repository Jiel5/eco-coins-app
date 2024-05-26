import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/card";

const Sampah = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");
  const [estimasi, setEstimasi] = useState(1);

  const nama = "Munir Alwi";
  const nomor = "01234567890";
  const alamat = "Jl. Cempaka Putih No. 10";

  useEffect(() => {
    setCoords({
      lat: -6.7839585,
      lng: 110.8632511,
    });
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const getEmbedUrl = () => {
    if (coords.lat && coords.lng) {
      return `https://www.google.com/maps?q=${coords.lat},${coords.lng}&hl=es;z=14&output=embed`;
    }
    return "";
  };

  const handleSetEstimasi = (type) => {
    if (type === "inc") {
      setEstimasi(estimasi + 1);
    } else if (type === "dec") {
      if (estimasi > 1) {
        setEstimasi(estimasi - 1);
      }
    }
  };

  const handleSubmit = () => {
    console.log("bayar");
  };
  return (
    <>
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Bayar Sampah
          </div>
        </header>
        {/* informasi pembayaran */}
        <div className="mt-5">
          <div>
            <h2 className="font-semibold text-md">Informasi Pembayaran</h2>
            <p className="text-sm">
              Silahkan melakukan pembayaran ke rekening berikut
            </p>
          </div>
          <div className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700"></div>
          {/* input rekening */}
          <div className="mt-3">
            <div className="flex gap-5 items-center w-full">
              <label className="w-1/6 block mb-2 text-md font-medium text-gray-900">
                Metode Pembayaran
              </label>
              <input
                type="text"
                defaultValue={"Transfer Bank"}
                readOnly={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
            <div className="flex gap-5 items-center w-full mt-2">
              <label className="w-1/6 block mb-2 text-md font-medium text-gray-900">
                Bank
              </label>
              <input
                type="text"
                defaultValue={"BCA"}
                readOnly={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
            <div className="flex gap-5 items-center w-full mt-2">
              <label className="w-1/6 block mb-2 text-md font-medium text-gray-900">
                Nomor Rekening
              </label>
              <input
                type="text"
                defaultValue={"12345678910"}
                readOnly={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
            <div className="flex gap-5 items-center w-full mt-2">
              <label className="w-1/6 block mb-2 text-md font-medium text-gray-900">
                Atas Nama
              </label>
              <input
                type="text"
                defaultValue={"Munir Alwi"}
                readOnly={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
          </div>
          <div className="h-px mt-4 my-2 bg-gray-300 border-0 dark:bg-gray-700 "></div>

          {/* Alamat Pengiriman */}
          <div className=" mx-2 px-4 py-3 rounded-lg border-2 border-green-600">
            <p>Alamat Pengiriman</p>
            <div className="flex items-center mx-4 mt-2">
              <div id="nama" className="w-1/2">
                <p className="font-medium">{nama}</p>
                <p className="font-medium">{nomor}</p>
              </div>
              <div id="alamat" className="w-1/2">
                <p>{alamat}</p>
              </div>
              <div className="w-1/5 flex justify-center ">
                <Link
                  to={"/thrower/profile"}
                  className="px-4 py-1 rounded-xl bg-white border border-[black] hover:scale-90 transition-transform duration-200 "
                >
                  Ubah
                </Link>
              </div>
            </div>
            <div className="h-px mt-4 my-2 bg-gray-300 border-0 dark:bg-gray-700 "></div>
            <p className="mt-0">Detail Lokasi</p>
            {error && <p className="text-red-500">{error}</p>}
            {coords.lat && coords.lng ? (
              <div className="mt-3">
                <iframe
                  src={getEmbedUrl()}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            ) : (
              <p>Loading map...</p>
            )}
          </div>

          {/* Kategori Sampah */}
          <div className=" mx-2 px-4 py-3 rounded-lg border-2 border-green-600 mt-3">
            <p>Kategori Sampah</p>
            <div className="flex justify-between items-center mt-3">
              {["Plastik", "Kardus", "Kaleng", "Lainnya"].map(
                (option, index) => (
                  <label
                    key={index}
                    className={`px-4 py-1 rounded-lg border border-[black] cursor-pointer lg:px-6 ${
                      selectedOption === option
                        ? "bg-green-600 text-white"
                        : "bg-white text-black"
                    } transition-colors duration-300`}
                  >
                    <input
                      type="radio"
                      name="options"
                      defaultValue={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionChange(option)}
                      className="hidden"
                    />
                    {option}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Estimasi Berat */}
          <div className="mx-2 px-4 py-3 rounded-lg border-2 border-green-600 mt-3">
            <p>Estimasi Berat</p>
            <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
              <div className="flex justify-between ">
                <button
                  className="bg-[black] text-white px-4 py-1 rounded-l-lg text-xl cursor-pointer mb-2 lg:mb-0"
                  onClick={() => {
                    handleSetEstimasi("inc");
                  }}
                >
                  +
                </button>
                <input
                  type="text"
                  value={estimasi}
                  placeholder="0"
                  className="text-center w-20 border border-black text-black text-md focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 mb-2 lg:mb-0"
                />
                <button
                  className="bg-[black] text-white px-4 py-1 rounded-r-lg text-xl cursor-pointer mb-2 lg:mb-0"
                  onClick={() => {
                    handleSetEstimasi("dec");
                  }}
                >
                  -
                </button>
                <p className="ml-3 font-semibold text-md my-auto">Kg</p>
              </div>

              <div className="w-1/2 lg:w-[15%] px-4 lg:px-8 py-1 bg-green-300 rounded-full text-center">
                <p className="font-semibold mb-0">+ 7 Coin</p>
                <p className="mb-0">Etimasi Coin</p>
              </div>
            </div>
          </div>

          {/* Konversi Harga */}
          <div className=" mx-2 px-4 py-3 rounded-lg border-2 border-green-600 mt-3">
            <p>Konversi Harga</p>
            <p>Detail Konversi</p>
            <div className="flex justify-between items-center px-2 py-1 border-2 border-black mt-1 rounded-md text-black">
              <p> Estimasi Harga</p>
              <p className="font-bold">
                Rp. {Intl.NumberFormat("id-ID").format(20000)}
              </p>
            </div>
          </div>

          {/* tombol Kirim */}
          <div className="mt-4 text-right lg:mr-2">
            <button
              className="px-4 py-1 rounded-lg bg-green-600 text-white lg:text-lg lg:px-8 lg:py-1"
              onClick={() => {
                handleSubmit();
              }}
            >
              Kirimkan
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Sampah;
