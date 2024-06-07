import { useEffect, useState } from "react";
import Card from "../../../components/card";
import axios from "axios";
const data = {
  id_pengepul: 1,
};

const ProfilePicker = () => {
  const [dataPicker, setDataPicker] = useState({
    nama: null,
    telepon: null,
    alamat: null,
    email: null,
    jenis_kelamin: null,
    tanggal_lahir: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/pengepul/${
            data.id_pengepul
          }`
        );
        setDataPicker(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (data?.id_pengepul) {
      fetchData();
    }
  }, [data?.id_pengepul]);
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengepul/${
          data.id_pengepul
        }`,
        dataPicker
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card extra={"w-full sm:overflow-auto py-4"}>
      <header className="relative flex items-center justify-between px-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Profile Saya
        </div>
      </header>

      <div className="w-full px-4 py-2 bg-green-400 mt-2">
        <p>
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun
        </p>
      </div>

      <div className="mt-5 px-4 flex flex-col gap-y-4">
        <div id="inputNama">
          <label htmlFor="nama" className="text-lg">
            Nama Panjang
          </label>
          <input
            type="text"
            defaultValue={dataPicker.nama}
            onChange={(e) =>
              setDataPicker({ ...dataPicker, nama: e.target.value })
            }
            id="nama"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>
        <div id="inputEmail">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            defaultValue={dataPicker.email}
            onChange={(e) =>
              setDataPicker({ ...dataPicker, email: e.target.value })
            }
            id="email"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>
        <div id="inputAlamat">
          <label htmlFor="alamat" className="text-lg">
            Alamat
          </label>
          <input
            type="text"
            defaultValue={dataPicker.alamat}
            id="alamat"
            onChange={(e) =>
              setDataPicker({ ...dataPicker, alamat: e.target.value })
            }
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>
        <div id="inputNoHp">
          <label htmlFor="no_hp" className="text-lg">
            Nomor Telepon
          </label>
          <input
            type="tel"
            defaultValue={dataPicker.telepon}
            id="no_hp"
            onChange={(e) =>
              setDataPicker({ ...dataPicker, telepon: e.target.value })
            }
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-1/4 mt-2 bg-green-600 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
        >
          Simpan
        </button>
      </div>
    </Card>
  );
};

export default ProfilePicker;
