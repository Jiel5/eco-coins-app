import Card from "../../../components/card";

const Koinku = () => {
  const coins = 1000;
  const koinku = [
    {
      id: 1,
      rupiah: 50000,
      koin: 1000,
    },
    {
      id: 2,
      rupiah: 150000,
      koin: 1500,
    },
    {
      id: 3,
      rupiah: 200000,
      koin: 2000,
    },
    {
      id: 4,
      rupiah: 250000,
      koin: 2500,
    },
    {
      id: 5,
      rupiah: 300000,
      koin: 3000,
    },
    {
      id: 6,
      rupiah: 350000,
      koin: 3500,
    },
  ];
  return (
    <>
      <Card extra="w-full sm:overflow-auto p-4">
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white flex justify-center">
            Koinku
          </div>
          <div className="text-lg font-medium text-navy-700 dark:text-white flex justify-center">
            My Coin: <span className="font-bold mx-2">{coins}</span> PC
          </div>
        </header>
        {/* koin */}
        <div className="flex flex-wrap gap-4 lg:gap-5 mt-4 justify-around">
          {koinku.map((koin) => (
            <button
              className="w-[45%] lg:w-1/4 border-2 border-black rounded-lg overflow-hidden bg-gray-50 hover:scale-95 transition duration-300"
              key={koin.id}
            >
              <div className="mx-4 mb-1">
                <p className="text-xl font-bold my-2 text-start">EcoCoins</p>
                <div className="flex items-center">
                  <sup className="text-lg mr-1 font-medium">Rp</sup>
                  <p className="font-bold text-3xl">
                    {Intl.NumberFormat("id-ID").format(koin.rupiah)}
                  </p>
                </div>
              </div>
              <div className="text-end  py-1 lg:py-2 bg-green-400 rounded-t-lg">
                <p className="mx-4 font-semibold">{koin.koin} PC</p>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Koinku;
