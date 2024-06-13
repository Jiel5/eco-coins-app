/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/card";
import axios from "axios";
import Swal from "sweetalert2";

const Sampah = () => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [coords] = useState({ lat: -6.7839585, lng: 110.8632511 });
  const [error, setError] = useState("");
  const [estimasi, setEstimasi] = useState(1);
  const [userData, setUserData] = useState({});
  const [nearestCollector, setNearestCollector] = useState("");
  const [collectors, setCollectors] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const id_pengguna = localStorage.getItem("id_pengguna");
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengguna/${id_pengguna}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      setUserData(response.data.pengguna);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCollectorData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengepul`
      );
      setCollectors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEstimasiKoin = () => {
    // Assuming selectedOption and estimasi are defined and usable here
    let coin = 0;

    if (selectedOption === 1) {
      coin = estimasi * 20;
    } else if (selectedOption === 6) {
      coin = estimasi * 30;
    } else if (selectedOption === 7) {
      coin = estimasi * 50;
    } else if (selectedOption === 8) {
      coin = estimasi * 100;
    } else {
      coin = estimasi;
    }

    showToastHandler({
      show: true,
      message: `Anda akan mendapatkan ${coin} EC Coin.`,
      type: "success",
    });
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/sampah`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data); // Adjust this based on your API response structure
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCollectorData();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      handleEstimasiKoin();
    }
  }, [selectedOption, estimasi]);

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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCollectorChange = (collector) => {
    setNearestCollector(collector);
  };

  const getEmbedUrl = () => {
    if (coords.lat && coords.lng) {
      return `https://www.google.com/maps?q=${coords.lat},${coords.lng}&hl=es;z=14&output=embed`;
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
    try {
      if (!selectedOption || !nearestCollector || !estimasi) {
        setError("Semua field harus diisi");
        return;
      }
      const token = localStorage.getItem("token");

      const data = {
        id_pengguna: userData.id_pengguna,
        id_sampah: parseInt(selectedOption),
        id_pengepul: parseInt(nearestCollector),
        berat_kg: estimasi,
        tanggal: new Date().toISOString().split("T")[0],
      };

      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin mengirim transaksi?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/transaksi-sampah`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 201) {
            Swal.fire({
              title: "Berhasil!",
              text: "Transaksi berhasil dikirim.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/thrower/transaksi");
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Gagal mengirim transaksi.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Transaksi dibatalkan");
        }
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
      setError("Terjadi kesalahan saat mengirimkan transaksi");
    }
  };

  return (
    <>
      {/* toast */}
      <div>
        {toast.show && (
          <div
            className={`fixed top-0 right-0 m-4 p-4 border rounded-lg bg-${
              toast.type === "success" ? "green-500" : "red-500"
            } text-white`}
          >
            {toast.message}
          </div>
        )}
      </div>
      {/* toast end */}
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Buang Sampah
          </div>
        </header>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        <div className="mt-5">
          <div className="mx-2 px-4 py-3 rounded-lg border-2 border-green-600">
            <p>Alamat Pengiriman</p>
            <div className="flex items-center mx-4 mt-2">
              <div id="nama" className="w-1/2">
                <p className="font-medium">{userData.nama}</p>
                <p className="font-medium">{userData.telepon}</p>
              </div>
              <div id="alamat" className="w-1/2">
                <p>{userData.alamat}</p>
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
          <div className="mx-2 px-4 py-3 rounded-lg border-2 border-green-600 mt-3">
            <p>Kategori Sampah</p>
            <div className="flex justify-between items-center mt-3">
              {categories.map((category, index) => (
                <label
                  key={index}
                  className={`px-4 py-1 rounded-lg border border-[black] cursor-pointer lg:px-6 ${
                    selectedOption === category.id_sampah
                      ? "bg-green-600 text-white"
                      : "bg-white text-black"
                  } transition-colors duration-300`}
                >
                  <input
                    type="radio"
                    name="options"
                    value={category.id_sampah}
                    checked={selectedOption === category.id_sampah}
                    onChange={() => handleOptionChange(category.id_sampah)}
                    className="hidden"
                  />
                  {category.jenis_sampah}
                </label>
              ))}
            </div>
          </div>
          <div className="mx-2 px-4 py-3 rounded-lg border-2 border-green-600 mt-3">
            <p>Pilih Pengepul Terdekat</p>
            <select
              value={nearestCollector || ""}
              onChange={(e) => handleCollectorChange(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            >
              <option value="">Pilih Pengepul</option>
              {collectors.map((collector, index) => (
                <option key={index} value={collector.id_pengepul}>
                  {collector.nama} - {collector.alamat}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-2 px-4 py-3 rounded-lg border-2 border-green-600 mt-3">
            <p className="font-semibold mb-1">Estimasi Berat</p>
            <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
              <div className="flex justify-between items-center">
                <button
                  className="bg-black text-white px-4 py-1 rounded-l-lg text-xl cursor-pointer mb-2 lg:mb-0"
                  onClick={() => handleSetEstimasi("dec")}
                >
                  -
                </button>
                <input
                  type="text"
                  value={estimasi}
                  placeholder="0"
                  className="text-center w-20 border border-black text-black text-md focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 mb-2 lg:mb-0"
                  readOnly
                />
                <button
                  className="bg-black text-white px-4 py-1 rounded-r-lg text-xl cursor-pointer mb-2 lg:mb-0"
                  onClick={() => handleSetEstimasi("inc")}
                >
                  +
                </button>
                <p className="ml-3 font-semibold text-md my-auto">Kg</p>
              </div>
              <div className="w-full lg:w-auto mt-2 lg:mt-0 lg:ml-4">
                <div className="bg-green-300 rounded-full text-center py-1 px-4">
                  <p className="font-semibold mb-0">
                    +{" "}
                    {selectedOption === 1
                      ? estimasi * 20
                      : selectedOption === 6
                      ? estimasi * 30
                      : selectedOption === 7
                      ? estimasi * 50
                      : selectedOption === 8
                      ? estimasi * 100
                      : estimasi}{" "}
                    <span>EC Coin</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 mt-4 text-right lg:mr-2">
            <button
              className="px-4 py-1 rounded-lg bg-green-600 text-white lg:text-lg lg:px-8 lg:py-1"
              onClick={handleSubmit}
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
