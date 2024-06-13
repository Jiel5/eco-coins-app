import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/card";

const AmbilSampah = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_pengepul = localStorage.getItem("id_pengepul");
        console.log("Token:", token); // Log token for debugging
        console.log("ID Pengepul:", id_pengepul); // Log id_pengepul for debugging

        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/transaksi-sampah/pengepul/${id_pengepul}/status/pending`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched Data:", response.data.data); // Log fetched data for debugging
        setPendingTransactions(response.data.data); // Set data transaksi pending ke state
      } catch (error) {
        console.error("Error fetching pending transactions:", error);
      }
    };

    fetchPendingTransactions();
  }, []); // Memanggil fetchPendingTransactions hanya sekali saat komponen dimuat

  const handleVerify = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token for Verify:", token); // Log token for debugging

      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/transaksi-sampah/${transactionId}/verify`,
        {}, // Pass an empty object as the second parameter
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message and redirect
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction verified successfully!",
      }).then(() => {
        navigate("/picker/riwayat-transaksi-pengepul"); // Redirect to transaction history
      });

      // Handle response if needed
      console.log("Verify Response:", response);
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to verify transaction!",
      });

      // Handle error
      if (error.response) {
        console.error("Error Response:", error.response);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleReject = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token for Reject:", token); // Log token for debugging

      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/transaksi-sampah/${transactionId}/reject`,
        {}, // Pass an empty object as the second parameter
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message and redirect
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction rejected successfully!",
      }).then(() => {
        navigate("/picker/riwayat-transaksi-pengepul"); // Redirect to transaction history
      });

      // Handle response if needed
      console.log("Reject Response:", response.data);
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to reject transaction!",
      });

      // Handle error
      if (error.response) {
        console.error("Error Response:", error.response);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 ml-2 mb-4 dark:text-white">
            Data Pengambilan Sampah
          </div>
        </header>

        {/* Data Pengambilan Sampah */}
        <div className="mx-2 py-3 rounded-lg">
          <div className="overflow-x-scroll xl:overflow-x-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b border-gray-300 px-4 py-2">No</th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Pembuang
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">Alamat</th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Jenis Sampah
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">Berat</th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Nilai Koin Per KG
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Jumlah Koin
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2">
                    Tanggal
                  </th>
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
                      {transaction.Pengguna.alamat}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.Sampah.jenis_sampah}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.berat_kg} Kg
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {transaction.Sampah.nilai_koin_per_kg}
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
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full text-xs"
                        onClick={() => handleVerify(transaction.id_transaksi)}
                      >
                        Terima
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full text-xs ml-2"
                        onClick={() => handleReject(transaction.id_transaksi)}
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

export default AmbilSampah;
