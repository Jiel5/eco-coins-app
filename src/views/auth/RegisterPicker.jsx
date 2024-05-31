import { Link } from "react-router-dom";
import Card from "../../components/card";

const RegisterPicker = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("register");
  };
  return (
    <div className="h-screen flex items-center justify-center transition-all">
      <Card extra="w-[90vw] lg:w-full sm:overflow-auto py-5 lg:p-4 max-w-5xl mx-auto">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-full flex-col items-center justify-center hidden lg:flex">
            <h1 className="text-xl font-bold text-navy-700 dark:text-white lg:mt-16">
              REGISTER PICKER
            </h1>
            <img
              src="/img/trashLogin.png"
              alt="logo"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>

          <div className="w-full lg:w-1/2 h-full my-auto">
            <div
              id="headerLogin"
              className="flex items-center flex-col justify-center"
            >
              <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
                ECO <span className="text-green-600">COINS</span>
              </h1>
              <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                Silahkan Daftar Akun Sebagai PICKER
              </h2>
            </div>

            <div className="mx-10 mt-2">
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div id="inputNama">
                  <label htmlFor="nama" className="">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    placeholder="nama lengkap"
                    className=" text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>
                <div id="inputAlamat">
                  <label htmlFor="alamat" className="">
                    Alamat
                  </label>
                  <input
                    type="text"
                    id="alamat"
                    placeholder="lamat lengkap"
                    className=" text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>
                <div id="inputEmail">
                  <label htmlFor="email" className="">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email@example.com"
                    className=" text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>
                <div id="inputTelepon">
                  <label htmlFor="handphone" className="">
                    No. Handphone
                  </label>
                  <input
                    type="tel"
                    id="handphone"
                    placeholder="masukkan nomor handphone"
                    className=" text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>
                <div id="inputPassword">
                  <label htmlFor="password" className="">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="masukkan password"
                    id="password"
                    className=" text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>
                <div id="inputConfirmPassword">
                  <label htmlFor="confirmPassword" className="">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    placeholder="masukkan ulang password"
                    id="confirmPassword"
                    className=" text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>

                <div className="mx-auto mt-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-8 rounded-primary font-sans">
                    Daftar
                  </button>
                </div>
              </form>

              <div className="text-center mt-2">
                <p>
                  Sudah punya akun?{" "}
                  <Link
                    to="/auth/thrower/"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPicker;
