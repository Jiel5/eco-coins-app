import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/card";
import Swal from "sweetalert2";

const RegisterPicker = () => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    email: "",
    telepon: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields
    if (!formData.nama) newErrors.nama = "Nama tidak boleh kosong";
    if (!formData.alamat) newErrors.alamat = "Alamat tidak boleh kosong";
    if (!formData.email) newErrors.email = "Email tidak boleh kosong";
    if (!formData.telepon) newErrors.telepon = "No. telepon tidak boleh kosong";
    if (!formData.password) newErrors.password = "Password tidak boleh kosong";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password tidak boleh kosong";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Fotmat email tidak valid";
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10,12}$/;
    if (formData.telepon && !phoneRegex.test(formData.telepon)) {
      newErrors.telepon = "Format No Telepon tidak valid";
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords tidak matching";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengepul`,
        {
          nama: formData.nama,
          alamat: formData.alamat,
          email: formData.email,
          telepon: formData.telepon,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        Swal.fire("Success", "Account registered successfully", "success");
        navigate("/auth/picker/");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to register account", "error");
      console.error("Error registering user:", error);
    }
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
                    name="nama"
                    placeholder="nama lengkap"
                    className="text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.nama}
                    onChange={handleChange}
                  />
                  {errors.nama && (
                    <p className="text-red-500 text-sm">{errors.nama}</p>
                  )}
                </div>
                <div id="inputAlamat">
                  <label htmlFor="alamat" className="">
                    Alamat
                  </label>
                  <input
                    type="text"
                    id="alamat"
                    placeholder="alamat lengkap"
                    className="text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.alamat}
                    onChange={handleChange}
                  />
                  {errors.alamat && (
                    <p className="text-red-500 text-sm">{errors.alamat}</p>
                  )}
                </div>
                <div id="inputEmail">
                  <label htmlFor="email" className="">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div id="inputTelepon">
                  <label htmlFor="telepon" className="">
                    No. telepon
                  </label>
                  <input
                    type="tel"
                    id="telepon"
                    placeholder="masukkan nomor telepon"
                    className="text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.telepon}
                    onChange={handleChange}
                  />
                  {errors.telepon && (
                    <p className="text-red-500 text-sm">{errors.telepon}</p>
                  )}
                </div>
                <div id="inputPassword">
                  <label htmlFor="password" className="">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="masukkan password"
                    id="password"
                    className="text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <div id="inputConfirmPassword">
                  <label htmlFor="confirmPassword" className="">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    placeholder="masukkan ulang password"
                    id="confirmPassword"
                    className="text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
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
