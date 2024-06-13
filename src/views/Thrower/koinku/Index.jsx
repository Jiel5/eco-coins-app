import { useState, useEffect } from "react";
<<<<<<< HEAD
import Card from "../../../components/card";
import axios from "axios";
import ModalDelete from "../../../components/modal/ModalDelete";
import Toast from "../../../components/Toast/Index";
const Koinku = () => {
  const [coins, setCoins] = useState(0);
  const [koinku, setDataKoinku] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataTukar, setDataTukar] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [idPengepul, setIdPengepul] = useState(null);
  const [dataPengepul, setDataPengepul] = useState([]);
  const id_pengguna = 1;
  useEffect(() => {
    getKoinku();
    getKoin();
    getPengepul();
  }, []);

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
  const getKoinku = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/nilai-tukar`
      );
      setDataKoinku(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKoin = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengguna/${id_pengguna}`
      );
      setCoins(response.data.saldo_koin);
    } catch (error) {
      console.log(error);
    }
  };

  const tukarKoin = async () => {
    const cekSaldo = coins - dataTukar.nilai_koin;
    if (cekSaldo < 0) {
      alert("Saldo anda tidak mencukupi");
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/penukaran-koin`,
        {
          id_pengguna: 1,
          id_pengepul: 1,
          id_nilai_tukar_koin: 1,
        }
      );
    }
    getKoin();
    setModalIsOpen(false);
    showToastHandler({
      show: true,
      message: "Berhasil Tukar Koin!",
      type: "success",
    });
  };
  const openModal = async (data) => {
    setModalIsOpen(true);
    setDataTukar(data);
  };
=======
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

>>>>>>> c05cdf193b1885bf18e477fb865b0064be750db3
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
      <Card extra="w-full sm:overflow-auto p-4">
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white flex justify-center">
            Koinku
          </div>
          <div className="text-lg font-medium text-navy-700 dark:text-white flex justify-center mr-4">
            Koin: <span className="font-bold mx-2">{coins}</span> EC
          </div>
        </header>
<<<<<<< HEAD

        {/* modal untuk tukar koin */}
        <ModalDelete
          setModalIsOpenDelete={() => setModalIsOpen(false)}
          modalIsOpenDelete={modalIsOpen}
          handleDelete={tukarKoin}
          message={"Pilih Pengepul"}
          textButton="Tukar"
        >
          <select
            id="keterangan"
            className="bg-gray-100 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={idPengepul}
            onChange={(e) => setIdPengepul(e.target.value)}
          >
            {dataPengepul.map((pengepul) => (
              <option key={pengepul.id_pengepul} value={pengepul.id_pengepul}>
                {pengepul.nama}
              </option>
            ))}
          </select>
        </ModalDelete>

        {/* koin */}
        <div className="flex flex-wrap gap-4 lg:gap-5 mt-4 justify-around">
          {koinku.map((koin) => (
            <button
              className="w-[45%] lg:w-1/4 border-2 border-black rounded-lg overflow-hidden bg-gray-50 hover:scale-95 transition duration-300"
              key={koin.id_nilai_tukar_koin}
              onClick={() => openModal(koin)}
=======
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
>>>>>>> c05cdf193b1885bf18e477fb865b0064be750db3
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
<<<<<<< HEAD
              <div className="text-end  py-1 lg:py-2 bg-green-400 rounded-t-lg">
                <p className="mx-4 font-semibold">{koin.nilai_koin} PC</p>
=======
              <div className="text-end py-1 lg:py-2 bg-green-400 rounded-b-lg">
                <p className="mx-4 font-semibold">{koin.nilai_koin} EC</p>
>>>>>>> c05cdf193b1885bf18e477fb865b0064be750db3
              </div>
            </button>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Koinku;
