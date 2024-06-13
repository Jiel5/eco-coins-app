import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../../components/card";
import Swal from "sweetalert2";

const TransaksiKoinPicker = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_pengepul = localStorage.getItem("id_pengepul");
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/penukaran-koin/pengepul/${id_pengepul}/status/pending`,
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

  const handleVerify = async (transactionId) => {
    try {
      const { value: keterangan } = await Swal.fire({
        title: "Verification",
        input: "text",
        inputLabel: "Masukkan keterangan",
        inputPlaceholder: "Keterangan",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });

      if (keterangan) {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/penukaran-koin/${transactionId}/verify`,
          { keterangan },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire("Success", "Transaksi Berhasil", "success");
          // Update the state to remove the verified transaction
          setPendingTransactions((prevTransactions) =>
            prevTransactions.filter(
              (transaction) => transaction.id_penukaran !== transactionId
            )
          );
        }
      }
    } catch (error) {
      Swal.fire("Error", "Failed to verify transaction", "error");
      console.error("Error verifying transaction:", error);
    }
  };

  const handleReject = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/penukaran-koin/${transactionId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Transaksi tukar koin berhasil di tolak", "success");
        // Update the state to remove the rejected transaction
        setPendingTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.id_penukaran !== transactionId
          )
        );
      }
    } catch (error) {
      Swal.fire("Error", "Failed to reject transaction", "error");
      console.error("Error rejecting transaction:", error);
    }
  };
  return (
    <>
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 ml-2 mb-4 dark:text-white">
            Data Tukar Koin
          </div>
        </header>

        {/* data transaksi */}
        <div className="mx-2 py-3 rounded-lg">
          <div className="overflow-x-scroll xl:overflow-x-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b border-gray-300 px-4 py-2">No</th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Pembuang
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    No Hp
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
                  <th className="border-b border-gray-300 px-4 py-2">Aksi</th>
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
                      {transaction.Pengguna.nama}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.Pengguna.telepon}
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
                    <td className="border-b border-gray-300 px-4 py-2">
                      <span className="mr-2">Rp.</span>
                      {Intl.NumberFormat("id-ID").format(
                        transaction.jumlah_uang
                      )}
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
                    <td className="border-b border-gray-300 px-4 py-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full text-xs"
                        onClick={() => handleVerify(transaction.id_penukaran)}
                      >
                        Terima
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full text-xs ml-2"
                        onClick={() => handleReject(transaction.id_penukaran)}
                      >
                        Tolak
                      </button>
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

export default TransaksiKoinPicker;
