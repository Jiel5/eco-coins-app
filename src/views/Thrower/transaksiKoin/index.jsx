import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../../components/card";

const TransaksiKoin = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_pengguna = localStorage.getItem("id_pengguna");
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/penukaran-koin/pengguna/${id_pengguna}/status/pending`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setPendingTransactions(response.data.penukaranKoin); // Set data transaksi pending ke state
      } catch (error) {
        console.error("Error fetching pending transactions:", error);
      }
    };

    fetchPendingTransactions();
  }, []); // Memanggil fetchPendingTransactions hanya sekali saat komponen dimuat

  return (
    <>
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 ml-2 mb-4 dark:text-white">
            Data Transaksi Pending
          </div>
        </header>

        {/* data transaksi pending */}
        <div className="mx-2  py-3 rounded-lg">
          <div className="overflow-x-scroll xl:overflow-x-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b border-gray-300 px-4 py-2">No</th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Nama Pengepul
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Tukar Koin
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Jumlah Uang
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Tanggal
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingTransactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="border-b border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.Pengepul.nama}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.jumlah_uang === 50000
                        ? "-1000"
                        : transaction.jumlah_uang === 100000
                        ? "-1500"
                        : transaction.jumlah_uang === 150000
                        ? "-2000"
                        : transaction.jumlah_uang === 200000
                        ? "-2500"
                        : transaction.jumlah_uang === 250000
                        ? "-3000"
                        : transaction.jumlah_uang === 300000
                        ? "-3500"
                        : // nilai default jika tidak ada kondisi yang cocok
                          "Nilai tidak tersedia"}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2"><span className="mr-2">Rp.</span>
                      {Intl.NumberFormat("id-ID").format(transaction.jumlah_uang)}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {new Date(transaction.tanggal).toLocaleString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          transaction.status === "diterima"
                            ? "bg-yellow-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TransaksiKoin;
