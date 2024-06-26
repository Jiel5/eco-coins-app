import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card";
import axios from "axios";
import { useState } from "react";
import logo from "/logo/logo1.png";

const LoginThrower = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/login/pengguna`, {
        email,
        password,
      })
      .then((response) => {
        console.log("Response:", response);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id_pengguna", response.data.id_pengguna);
          setMessage("Login successful!");
          navigate("/thrower/home");
        } else {
          setMessage("Login failed.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setMessage("Email dan Password tidak valid");
      });
  };
  return (
    <div className="h-screen flex items-center justify-center transition-all">
      <Card extra="w-[90vw] lg:w-full sm:overflow-auto py-12 lg:px-4 lg:py-[6vh] max-w-5xl mx-auto">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-full flex-col items-center justify-center hidden lg:flex">
            <h1 className="text-xl font-bold text-navy-700 dark:text-white lg:mt-16">
              LOGIN THROWER
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
              <div className="flex justify-center items-center">
                <img src={logo} width={65} alt="" />
                <h1 className="text-4xl text-center font-bold  text-green-600 dark:text-white">
                  ECO <span className="text-orange-400">COINS</span>
                </h1>
              </div>
              <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                Masuk dan Verifikasi
              </h2>
              <h3 className="block font-bold text-navy-700 lg:hidden mt-1">
                LOGIN THROWER
              </h3>
              {message && <p className="text-red-500">{message}</p>}
            </div>

            {/* input */}
            <div className="mx-10 mt-5 lg:mt-10">
              <form className="flex flex-col gap-8" onSubmit={handleLogin}>
                <div id="inputEmail">
                  <label htmlFor="email" className="text-lg">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="mt-2 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>
                <div id="Password">
                  <label htmlFor="password" className="text-lg">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    className="mt-2 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  />
                </div>

                <div className="mx-auto mt-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-8 rounded-primary font-sans">
                    Login
                  </button>
                </div>
              </form>

              <div className="text-center mt-5">
                <p>
                  Belum punya akun?{" "}
                  <Link
                    to="/auth/thrower/register"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Daftar
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

export default LoginThrower;
