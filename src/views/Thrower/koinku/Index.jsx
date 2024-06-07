import { useState, useEffect } from "react";
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
          <div className="text-lg font-medium text-navy-700 dark:text-white flex justify-center">
            My Coin: <span className="font-bold mx-2">{coins}</span> PC
          </div>
        </header>

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
            >
              <div className="mx-4 mb-1">
                <p className="text-xl font-bold my-2 text-start">EcoCoins</p>
                <div className="flex items-center">
                  <sup className="text-lg mr-1 font-medium">Rp</sup>
                  <p className="font-bold text-3xl">
                    {Intl.NumberFormat("id-ID").format(koin.nilai_uang)}
                  </p>
                </div>
              </div>
              <div className="text-end  py-1 lg:py-2 bg-green-400 rounded-t-lg">
                <p className="mx-4 font-semibold">{koin.nilai_koin} PC</p>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Koinku;
