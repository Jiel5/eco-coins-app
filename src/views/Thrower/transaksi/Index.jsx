import Card from "../../../components/card";

const Transaksi = () => {
  const nama = "Munir Alwi";
  const alamat = "Jl. Cempaka Putih No. 10";
  const kategoriSampah = "Sampah Kardus";
  const estimasi = 5;
  const status = false;
  return (
    <>
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Transaksi
          </div>
        </header>

        {/* data transaksi */}
        <div className=" mx-2 px-2 py-3 rounded-lg border-2 border-green-600">
          <table className="flex flex-col gap-y-4">
            <tr id="nama">
              <td width={150} className="font-semibold">
                Nama
              </td>
              <td width={50} className="font-semibold">
                :
              </td>
              <td className="font-medium">{nama}</td>
            </tr>
            <tr id="alamat">
              <td width={150} className="font-semibold">
                Alamat
              </td>
              <td width={50} className="font-semibold">
                :
              </td>
              <td className="font-medium">{alamat}</td>
            </tr>
            <tr id="kategori">
              <td width={150} className="font-semibold">
                Kategori Sampah
              </td>
              <td width={50} className="font-semibold">
                :
              </td>
              <td className="font-medium">{kategoriSampah}</td>
            </tr>
            <tr id="estimasi">
              <td width={150} className="font-semibold">
                Estimasi Berat
              </td>
              <td width={50} className="font-semibold">
                :
              </td>
              <td className="font-medium">{estimasi} Kg</td>
            </tr>
            <tr id="status">
              <td width={150} className="font-semibold">
                Estimasi Berat
              </td>
              <td width={50} className="font-semibold">
                :
              </td>
              <td className="font-medium">
                {status ? (
                  <div className="text-white bg-green-600 px-4 rounded-lg">
                    Telah di Valiasi
                  </div>
                ) : (
                  <div className="text-white bg-red-500 px-4 text-sm rounded-lg">
                    Belum di Validasi
                  </div>
                )}
              </td>
            </tr>
          </table>
        </div>
      </Card>
    </>
  );
};

export default Transaksi;
