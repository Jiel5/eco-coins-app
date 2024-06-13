import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../../components/card";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Koinku = () => {
  const [koinku, setKoinku] = useState([]);
  const [coins, setCoins] = useState(0);
  const [selectedCollector, setSelectedCollector] = useState("");
  const [selectedExchangeRate, setSelectedExchangeRate] = useState("");
  const [collectors, setCollectors] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchKoinku = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/nilai-tukar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setKoinku(response.data);
      } catch (error) {
        console.error("Error fetching koinku:", error);
      }
    };

    const fetchUserCoins = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_pengguna = localStorage.getItem("id_pengguna");
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/pengguna/${id_pengguna}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.pengguna.saldo_koin);
        setCoins(response.data.pengguna.saldo_koin);
      } catch (error) {
        console.error("Error fetching user's coins:", error);
      }
    };

    const fetchCollectorData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/pengepul`
        );
        setCollectors(response.data);
      } catch (error) {
        console.error("Error fetching collectors:", error);
      }
    };

    fetchKoinku();
    fetchUserCoins();
    fetchCollectorData();
  }, []);

  const addRedeemCoin = async () => {
    try {
      const token = localStorage.getItem("token");
      const id_pengguna = localStorage.getItem("id_pengguna");
      const payload = {
        id_pengguna: id_pengguna,
        id_pengepul: selectedCollector,
        id_nilai_tukar_koin: selectedExchangeRate,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/penukaran-koin`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      // Show success message
      await Swal.fire("Sukses!", "Koin berhasil ditukar. mohon tunggu pengepul untuk memverifikasi dan mengirimkan uang kepada kamu yaa!! terimakaih telah bergabung dengan kami", "success");
      navigate("/thrower/tukar-koin");
    } catch (error) {
      console.error("Error:", error);
      // Show error message
      await Swal.fire("Error!", "Gagal melakukan penukaran koin. data pengepul harus diisi", "error");
    }
  };

  const handleRedeemCoin = (exchangeRateId, requiredCoins) => {
      if (coins < requiredCoins) {
        Swal.fire(
          "Saldo Tidak Cukup!",
          "Anda tidak memiliki saldo koin yang cukup untuk melakukan penukaran ini.",
          "error"
        );
        return;
      }
    setSelectedExchangeRate(exchangeRateId);
    // Ask for confirmation before redeeming coins
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menukar koin Anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, tukarkan!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        addRedeemCoin();
        // navigate('/thrower/tukar-koin')
      }
    });
  };

  return (
    <>
      <Card extra="w-full sm:overflow-auto p-4">
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white flex justify-center">
            Koinku
          </div>
          <div className="text-lg font-medium text-navy-700 dark:text-white flex justify-center mr-4">
            Koin: <span className="font-bold mx-2">{coins}</span> EC
          </div>
        </header>
        <div className="w-full lg:w-[45%]">
          <label htmlFor="collectorSelect" className="block mb-2 font-semibold">
            Pilih Pengepul:
          </label>
          <select
            id="collectorSelect"
            value={selectedCollector}
            onChange={(e) => setSelectedCollector(e.target.value)}
            className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-gray-200"
          >
            <option value="">-- Pilih Pengepul --</option>
            {collectors.map((collector) => (
              <option key={collector.id} value={collector.id_pengepul}>
                {collector.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-4 lg:gap-7 mt-4 justify-between">
          {koinku.map((koin) => (
            <button
              onClick={() =>
                handleRedeemCoin(koin.id_nilai_tukar_koin, koin.nilai_koin)
              }
              className="w-full lg:w-[45%] border-2 border-black rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition duration-300"
              key={koin.id_nilai_tukar_koin}
            >
              <div className="mx-4 my-2">
                <p className="text-xl font-bold mb-1 text-start">EcoCoins</p>
                <div className="flex items-center">
                  <sup className="text-lg mr-1 font-medium">Rp</sup>
                  <p className="font-bold text-3xl">
                    {Intl.NumberFormat("id-ID").format(koin.nilai_uang)}
                  </p>
                </div>
              </div>
              <div className="text-end py-1 lg:py-2 bg-green-400 rounded-b-lg">
                <p className="mx-4 font-semibold">{koin.nilai_koin} EC</p>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Koinku;
