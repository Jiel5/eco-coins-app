import { useEffect, useState } from "react";
import Card from "../../../components/card";
import axios from "axios";
import Toast from "../../../components/Toast/Index";

const Sampah = () => {
  const idPengguna = 1;

  const [selectedOption, setSelectedOption] = useState("");
  const [estimasi, setEstimasi] = useState(0);
  const id = 1;
  const [data, setData] = useState({
    nama: "",
    nomor: "",
    alamat: "",
  });
  const { nama, alamat, nomor } = data;
  const [sampah, setSampah] = useState([]);
  const [koin, setKoin] = useState(0);
  const [idPengepul, setIdPengepul] = useState(null);
  const [dataPengepul, setDataPengepul] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    getData();
    getSampah();
    getPengepul();
  }, []);

  useEffect(() => {
    // Panggil handleEstimasiKoin setiap kali selectedOption atau estimasi berubah
    if (selectedOption) {
      handleEstimasiKoin();
    }
  }, [selectedOption, estimasi]);

  useEffect(() => {
    // Set default id_pengepul ketika dataPengepul di-load
    if (dataPengepul.length > 0 && !idPengepul) {
      setIdPengepul(dataPengepul[0].id_pengepul);
    }
  }, [dataPengepul]);

  const showToastHandler = ({ show, message, type }) => {
    setToast({
      show,
      message,
      type,
    });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" }); // Menutup toast setelah 5 detik
    }, 5000);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengguna/${id}`
      );
      const { nama, alamat, telepon: nomor } = response.data;
      setData({ nama, alamat, nomor });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSampah = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/sampah`
      );
      setSampah(response.data);
    } catch (error) {
      console.error("Error fetching sampah:", error);
    }
  };

  const getPengepul = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengepul`
      );
      setDataPengepul(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleEstimasiKoin = async () => {
    if (!selectedOption) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/sampah/${selectedOption}`
      );

      setKoin(response.data.nilai_koin_per_kg * estimasi);
    } catch (error) {
      console.error("Error fetching estimasi koin:", error);
    }
  };

  const handleSetEstimasi = (type) => {
    setEstimasi((prevEstimasi) => {
      if (type === "inc") {
        return prevEstimasi + 1;
      } else if (type === "dec") {
        return prevEstimasi > 0 ? prevEstimasi - 1 : 0;
      }
      return prevEstimasi;
    });
  };

  const handleSubmit = async () => {
    console.log({
      id_pengguna: idPengguna,
      id_sampah: selectedOption,
      id_pengepul: idPengepul,
      berat_kg: estimasi,
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/transaksi-sampah`,
        {
          id_pengguna: idPengguna,
          id_sampah: selectedOption,
          id_pengepul: idPengepul,
          berat_kg: estimasi,
        }
      );

      showToastHandler({
        show: true,
        message: response.data.message,
        type: "success",
      });
      console.log(response.data);
    } catch (error) {
      showToastHandler({
        show: true,
        message: "Gagal mengirim data. Silakan coba lagi.",
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <>
      {/* toast */}
      <div>
        {toast.show && (
          <Toast
            message={toast.message}
            icon={toast.type}
            onClose={() => setToast({ show: false, message: "", type: "" })}
          />
        )}
      </div>
      {/* toast end */}
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Buang Sampah
          </div>
        </header>
        {/* informasi pembayaran */}
        <div className="mt-5">
          <div className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700"></div>
          <div className="mt-3">
            <div className="flex gap-5 items-center w-full mt-2">
              <label className="w-1/6 block mb-2 text-md font-medium text-gray-900">
                Nama
              </label>
              <input
                type="text"
                defaultValue={nama}
                readOnly={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
            <div className="flex gap-5 items-center w-full mt-2">
              <label className="w-1/6 block mb-2 text-md font-medium text-gray-900">
                Nomor HP
              </label>
              <input
                type="text"
                defaultValue={nomor}
                readOnly={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
            <div className="flex gap-5 items-center w-full mt-2">
              <label className="w-1/6 block mb-2 text-md font-medium text-gray-900">
                Alamat
              </label>
              <input
                type="text"
                defaultValue={alamat}
                readOnly={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
            <div className="flex gap-5 items-center w-full mt-2">
              <label htmlFor="keterangan" className="w-1/6">
                Pengepul
              </label>
              <select
                id="keterangan"
                className="bg-gray-100 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={idPengepul} // Ensure the value is controlled
                onChange={(e) => setIdPengepul(e.target.value)}
              >
                {dataPengepul.map((pengepul) => (
                  <option
                    key={pengepul.id_pengepul}
                    value={pengepul.id_pengepul}
                  >
                    {pengepul.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-px mt-4 my-2 bg-gray-300 border-0 dark:bg-gray-700 "></div>

          {/* Kategori Sampah */}
          <div className="mx-2 px-4 py-3 border-green-600 mt-3">
            <p>Kategori Sampah</p>
            <div className="flex justify-between items-center mt-3">
              {sampah.map((sampah, index) => (
                <label
                  key={index}
                  className={`px-4 py-1 rounded-lg border border-[black] cursor-pointer lg:px-6 ${
                    selectedOption === sampah.id_sampah
                      ? "bg-green-600 text-white"
                      : "bg-white text-black"
                  } transition-colors duration-300`}
                >
                  <input
                    type="radio"
                    name="options"
                    value={sampah.id_sampah}
                    checked={selectedOption === sampah.id_sampah}
                    onChange={() => handleOptionChange(sampah.id_sampah)}
                    className="hidden"
                  />
                  {sampah.jenis_sampah}
                </label>
              ))}
            </div>
          </div>

          {/* Estimasi Berat */}
          <div className="mx-2 px-4 py-3 mt-3">
            <p>Estimasi Berat</p>
            <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
              <div className="flex justify-between">
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
                  readOnly
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
                <p className="font-semibold mb-0">+ {koin}</p>
                <p className="mb-0">Estimasi Koin</p>
              </div>
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
