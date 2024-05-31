import { Link } from "react-router-dom";
import Card from "../../components/card";

const AuthIndex = () => {
  return (
    <div className="h-screen flex items-center justify-center transition-all font-poppins">
      <Card extra="w-[90vw] lg:w-full sm:overflow-auto py-12 lg:px-4 lg:py-[10vh] max-w-5xl mx-auto">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-full flex-col items-center justify-center lg:flex">
            <div className="text-center lg:my-10">
              <h1 className="text-4xl font-bold lg:mb-16 text-navy-700 dark:text-white ">
                ECO <span className="text-green-600">COINS</span>
              </h1>
              <div className="lg:mt-5">
                <h2 className="font-poppins text-lg lg:text-2xl font-bold text-navy-800 text-center">
                  Silahkan
                </h2>
                <h2 className="font-poppins text-lg lg:text-2xl font-bold text-navy-800">
                  Pilih Jenis Pengguna
                </h2>
              </div>
              <h4 className="lg:w-[100%] lg:scale-90 w-[70%] text-xs lg:text-lg mx-auto text-center mt-2 lg:mt-5 font-poppins ">
                Bergabunglah dengan Bank Sampah dan Berkontribusi untuk Bumi
                yang Lebih Hijau
              </h4>
            </div>
          </div>
          <div className="w-full mx-5 lg:w-1/2 h-full flex-col items-center justify-center  lg:flex lg:gap-14">
            <Link
              to={"/auth/picker"}
              className="relative w-[90%] h-[200px] flex items-center text-start rounded-md bg-gradient-to-b from-[#2CB249] to-[#8DC649]
              lg:hover:hover:scale-105 text-white transition-all duration-200 font-semibold py-1 px-8 scale-75 hover:scale-[85%] lg:scale-100"
            >
              <div className="absolute -left-14 -top-6 w-[340px] h-[230px]">
                <img
                  src="/img/pickerlogo.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col pl-[200px]">
                <h1 className="text-xl mb-8">Mari Ambil Sampah</h1>
                <h1 className="text-3xl  drop-shadow-lg italic">Picker</h1>
              </div>
            </Link>
            <Link
              to={"/auth/thrower"}
              className="relative w-[90%] h-[200px] flex items-center text-start rounded-md bg-gradient-to-b from-[#2CB249] to-[#8DC649] 
              text-white transition-all duration-200 font-semibold py-1 px-8 lg:hover:hover:scale-105 scale-75 hover:scale-[85%] lg:scale-100"
            >
              <div className="absolute -left-14 -top-6 w-[320px] h-[230px]">
                <img
                  src="/img/throwerlogo.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col pl-[200px]">
                <h1 className="text-xl mb-8">Mari Buang Sampah</h1>
                <h1 className="text-3xl drop-shadow-lg italic">Thrower</h1>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthIndex;
