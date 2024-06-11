import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../../components/card";

const Riwayat = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_pengguna = localStorage.getItem("id_pengguna");
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/transaksi-sampah/riwayat/pengguna/${id_pengguna}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setPendingTransactions(response.data.riwayat); // Set data transaksi pending ke state
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
                  <th className="border-b border-gray-300 px-4 py-2">Nama</th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Nama Pengepul
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Jenis Sampah
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Berat Sampah (kg)
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Nilai Koin per (kg)
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Total Coin yang diterima
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
                      {transaction.nama_pengguna}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.nama_pengepul}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.jenis_sampah}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.berat_kg}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.nilai_koin_per_kg}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.jumlah_koin}
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
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
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

export default Riwayat;
