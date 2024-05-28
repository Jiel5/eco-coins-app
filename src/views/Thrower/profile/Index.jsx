import { useEffect, useState } from "react";
import Card from "../../../components/card";
const data = {
  nama: "Munir Alwi",
  no_hp: "01234567890",
  alamat: "Jl. Cempaka Putih No. 10",
  email: "munir@gmail.com",
  jenis_kelamin: "Perempuan",
  tanggal_lahir: "01-01-2000",
  bank: "BCA",
  rekening: "1234567890",
  atas_nama: "Munir Alwi",
  avatar: "avatar4.png",
  lokasi: {
    lat: -6.7839585,
    lng: 110.8632511,
  },
};

const Profile = () => {
  const {
    nama,
    no_hp,
    alamat,
    email,
    jenis_kelamin,
    tanggal_lahir,
    bank,
    rekening,
    atas_nama,
    avatar,
    lokasi,
  } = data;

  const [selectedGender, setSelectedGender] = useState(jenis_kelamin || "");
  const [coords, setCoords] = useState({ lat: lokasi.lat, lng: lokasi.lng });
  const [error, setError] = useState("");

  const getEmbedUrl = () => {
    if (coords.lat && coords.lng) {
      return `https://www.google.com/maps?q=${coords.lat},${coords.lng}&hl=es;z=14&output=embed`;
    }
    return "";
  };

  const handleUpdateLokasi = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
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
        <div id="inputAvatar">
          <label htmlFor="avatar" className="text-lg">
            Avatar
          </label>
          <div className="flex gap-x-6 items-center mt-1">
            <img
              src={`/img/${avatar}`}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <input type="file" id="avatar" className="" />
          </div>
        </div>

        <div id="inputNama">
          <label htmlFor="nama" className="text-lg">
            Nama Panjang
          </label>
          <input
            type="text"
            defaultValue={nama}
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
            defaultValue={email}
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
            defaultValue={alamat}
            id="alamat"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>

        <div id="inputNoHp">
          <label htmlFor="no_hp" className="text-lg">
            Nomor Telepon
          </label>
          <input
            type="tel"
            defaultValue={no_hp}
            id="no_hp"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>

        <div id="inputJenisKelamin">
          <label htmlFor="jeniskelamin" className="text-lg">
            Jenis Kelamin
          </label>
          <div className="text-md  text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
            <label className="mr-4">
              <input
                type="radio"
                name="jeniskelamin"
                value="Laki-laki"
                checked={selectedGender === "Laki-laki"}
                onChange={handleGenderChange}
                className="mr-1"
              />
              Laki-laki
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="jeniskelamin"
                value="Perempuan"
                checked={selectedGender === "Perempuan"}
                onChange={handleGenderChange}
                className="mr-1"
              />
              Perempuan
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="jeniskelamin"
                value="Lainnya"
                checked={selectedGender === "Lainnya"}
                onChange={handleGenderChange}
                className="mr-1"
              />
              Lainnya
            </label>
          </div>
        </div>
        <div id="inputTglLahir">
          <label htmlFor="tanggallahir" className="text-lg">
            Tanggal Lahir
          </label>
          <input
            type="date"
            defaultValue={tanggal_lahir}
            id="tanggallahir"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/6 p-2"
          />
        </div>
        <div id="inputBank">
          <label htmlFor="bank" className="text-lg">
            Bank
          </label>
          <input
            type="text"
            defaultValue={bank}
            id="bank"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>
        <div id="inputRekening">
          <label htmlFor="rekening" className="text-lg">
            Rekening Bank Saya
          </label>
          <input
            type="tel"
            defaultValue={rekening}
            id="rekening"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>
        <div id="inputAtasNama">
          <label htmlFor="atas_nama" className="text-lg">
            Atas Nama
          </label>
          <input
            type="text"
            defaultValue={atas_nama}
            id="atas_nama"
            className="text-md bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>

        <div className="">
          <div className="h-px mt-4 my-2 bg-gray-300 border-0 dark:bg-gray-700 "></div>
          <div className="flex items-center gap-8">
            <p className="mt-2">Detail Lokasi</p>
            <button
              onClick={() => handleUpdateLokasi()}
              className="w-1/4 lg:w-[10%] mt-2 border border-gray-600 hover:bg-gray-300 text-black font-bold py-1 px-4 rounded"
            >
              Update
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {coords.lat && coords.lng ? (
            <div className="mt-3">
              <iframe
                src={getEmbedUrl()}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
        <button className="w-1/4 mt-2 bg-green-600 hover:bg-green-600 text-white font-bold py-1 px-4 rounded">
          Simpan
        </button>
      </div>
    </Card>
  );
};

export default Profile;
