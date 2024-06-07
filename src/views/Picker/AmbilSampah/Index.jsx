import { useState, useMemo, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "../../../components/card";
import { columnsDataAmbilSampah } from "./columnsData";
import ModalComponent from "../../../components/modal";
import { MdEdit, MdSearch } from "react-icons/md";
import axios from "axios";
import Toast from "../../../components/Toast/Index";
import ModalDelete from "../../../components/modal/ModalDelete";

const dataPengepul = {
  id_pengepul: 1,
};

const AlamatPembuang = ({ id }) => {
  const [alamat, setAlamat] = useState("");
  const getAlamat = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengguna/${id}`
      );
      setAlamat(response.data.alamat);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAlamat();
  });

  return <span>{alamat}</span>;
};
const NamaPengepul = ({ id }) => {
  const [nama, setNama] = useState("");
  const getNamaPengepul = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengepul/${id}`
      );
      setNama(response.data.nama);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getNamaPengepul();
  });

  return <span>{nama}</span>;
};
const JumlahKoin = ({ id }) => {
  const [koin, setKoin] = useState(null);
  const getJumlahKoin = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/nilai-tukar/${id}`
      );
      setKoin(response.data.nilai_koin);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getJumlahKoin();
  });

  return <span>{koin}</span>;
};

const FormatTanggal = ({ tanggal }) => {
  const date = new Date(tanggal);

  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1; // getUTCMonth() returns month from 0-11
  month = month < 10 ? "0" + month : month; // Add "0" if month < 10
  let day = date.getUTCDate();
  day = day < 10 ? "0" + day : day;
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return <span>{formattedDate}</span>;
};

const AmbilSampah = () => {
  const columnsData = columnsDataAmbilSampah;

  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/transaksi-sampah/pengepul/${
          dataPengepul.id_pengepul
        }`
      );

      setTableData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize,
        globalFilter,
        sortBy: [
          {
            id: "id_transaksi", // Change this to the actual ID column key
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize: setTablePageSize,
    state: { pageIndex },
  } = tableInstance;

  const handleSearchChange = (e) => {
    setGlobalFilter(e.target.value);
    setTableGlobalFilter(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setTablePageSize(Number(e.target.value));
  };

  const [dataPenukaran, setDataPenukaran] = useState({
    id_transaksi: null,
    namaPengguna: null,
    alamat: null,
    jenisSampah: null,
    berat: null,
    jumlahKoin: null,
    tanggal: null,
    status: null,
  });

  const [statusPenukaran, setStatusPenukaran] = useState(null);

  const showToastHandler = ({ show, message, type }) => {
    setToast({
      show,
      message,
      type,
    });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" }); // Menutup toast setelah 5 detik
    }, 5000);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (statusPenukaran === "diterima") {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/transaksi-sampah/${
            dataPenukaran.id_transaksi
          }/verify`,
          {
            id_penukaran: dataPenukaran.id_penukaran,
          }
        );
      } else if (statusPenukaran === "ditolak") {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/transaksi-sampah/${
            dataPenukaran.id_transaksi
          }/reject`,
          {
            id_penukaran: dataPenukaran.id_penukaran,
          }
        );
      }
    } catch (error) {
      console.error(error);
    }

    fetchData();
    handleCloseModal();
    showToastHandler({
      show: true,
      message: "Penukaran Koin diperbarui!",
      type: "update",
    });
  };

  const handleEdit = async (data) => {
    setModalIsOpen(true);
    try {
      const getPenukar = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/pengguna/${data.id_pengguna}`
      );
      setDataPenukaran({
        id_transaksi: data.id_transaksi,
        namaPengguna: data.Pengguna.nama,
        jumlahKoin: data.jumlah_koin,
        jenisSampah: data.Sampah.jenis_sampah,
        alamat: getPenukar.data.alamat,
        berat: data.berat_kg,
        tanggal: data.tanggal,
        status: data.status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* toast */}
      <div>
        {toast.show && (
          <Toast
            message={toast.message}
            icon={toast.type}
            onClose={() => setToast({ show: false, message: "", type: "" })}
          />
        )}
      </div>
      {/* toast end */}

      {/* modal start */}
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <form className="flex flex-col gap-2 font-sans" onSubmit={handleSubmit}>
          <h2 className="text-xl font-medium font-sans">Form Ambil Sampah</h2>
          <div id="inputNama" className="mt-4">
            <label htmlFor="nama" className="font-medium">
              Nama Pembuang
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              defaultValue={dataPenukaran.namaPengguna}
              readOnly
              className="mt-1 bg-gray-100 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
          </div>
          <div id="inputJumlahKoin" className="mt-2">
            <label htmlFor="alamat" className="font-medium">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              readOnly
              defaultValue={dataPenukaran.alamat}
              className="mt-1 bg-gray-100 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
          </div>
          <div id="inputJumlahUang" className="mt-2">
            <label htmlFor="jenisSampah" className="font-medium">
              Jenis Sampah
            </label>
            <input
              type="text"
              id="jenisSampah"
              name="jenisSampah"
              value={dataPenukaran.jenisSampah}
              readOnly
              className="mt-1 bg-gray-100 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
          </div>
          <div id="inputJumlah" className="mt-2">
            <label htmlFor="berat" className="font-medium">
              Berat
            </label>
            <input
              type="text"
              id="berat"
              name="berat"
              defaultValue={dataPenukaran.berat}
              readOnly
              className="mt-1 bg-gray-100 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
          </div>
          <div id="inputJumlah" className="mt-2">
            <label htmlFor="JumlahKoin" className="font-medium">
              Jumlah Koin
            </label>
            <input
              type="number"
              id="JumlahKoin"
              name="JumlahKoin"
              defaultValue={dataPenukaran.jumlahKoin}
              readOnly
              className="mt-1 bg-gray-100 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
          </div>
          <div id="inputJumlah" className="mt-2">
            <label htmlFor="tanggalTukar" className="font-medium">
              Tanggal
            </label>
            <input
              type="text"
              id="tanggalTukar"
              name="tanggalTukar"
              readOnly
              defaultValue={dataPenukaran.tanggal}
              className="mt-1 bg-gray-100 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
          </div>

          <div id="inputJumlah" className="mt-2">
            <label htmlFor="keterangan" className="font-medium">
              Status
            </label>
            <select
              id="keterangan"
              className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setStatusPenukaran(e.target.value);
              }}
              defaultValue={dataPenukaran.status}
            >
              <option
                value="pending"
                selected={dataPenukaran.status === "pending"}
              >
                Pending
              </option>
              <option
                value="diterima"
                selected={dataPenukaran.status === "diterima"}
              >
                Diterima
              </option>
              <option
                value="ditolak"
                selected={dataPenukaran.status === "ditolak"}
              >
                Ditolak
              </option>
            </select>
          </div>
          <div className="mt-3 justify-end flex gap-1">
            <button
              type="button"
              onClick={handleCloseModal}
              className=" bg-gray-700  text-white font-medium py-1 px-4 rounded-md font-sans"
            >
              Batal
            </button>
            <button
              type="submit"
              className={` text-white font-medium py-1 px-4 rounded-md font-sans ${
                dataPenukaran.status === "diterima"
                  ? "bg-gray-700"
                  : "bg-blue-500"
              }`}
              disabled={dataPenukaran.status === "diterima"}
            >
              Update
            </button>
          </div>
        </form>
      </ModalComponent>
      {/* modal end */}

      <Card extra={"w-full sm:overflow-auto p-4"}>
        {/* Header */}
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Penukaran Koin
          </div>
        </header>
        {/* search */}
        <div className="flex items-center w-full mt-2 justify-between">
          <div className="flex items-center w-full justify-end">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="p-2 border border-gray-300 rounded mr-2 font-poppins text-sm"
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
            <div className="relative flex items-center lg:w-1/4 max-w-lg mr-2">
              <MdSearch className="absolute ml-2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={globalFilter}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="pl-8 pr-2 py-2 w-full rounded border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* table */}
        <div className="mt-6 overflow-x-scroll lg:mx-2 xl:overflow-x-hidden">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  <th
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    width="2%"
                  >
                    <div className="text-md font-bold tracking-wide text-gray-800 lg:text-md">
                      No
                    </div>
                  </th>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                      key={index}
                    >
                      <div className="text-md font-bold tracking-wide text-gray-800 lg:text-md">
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    width="10%"
                  >
                    <div className="text-md font-bold tracking-wide text-gray-800 lg:text-md">
                      Aksi
                    </div>
                  </th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index} className="border-b">
                    <td className="py-3 sm:text-[14px] border-b">
                      {pageIndex * page.length + index + 1}
                    </td>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "Pembuang") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value.nama}
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Alamat") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              <AlamatPembuang id={cell.value} />
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Jenis sampah") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value.jenis_sampah}
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Berat") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value} Kg
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Jumlah Koin") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value} Koin
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Tanggal") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              <FormatTanggal tanggal={cell.value} />
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Status") {
                        data = (
                          <div className="flex items-center">
                            <div className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value === "pending" ? (
                                <p className="px-2 py-1 bg-gray-300 rounded">
                                  Pending
                                </p>
                              ) : cell.value === "diterima" ? (
                                <p className="px-2 py-1 bg-green-300 rounded">
                                  Diterima
                                </p>
                              ) : (
                                <p className="px-2 py-1 bg-red-300 rounded">
                                  Ditolak
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className=" sm:text-[14px] border-b"
                        >
                          {data}
                        </td>
                      );
                    })}
                    <td className="flex gap-2 pt-[14px] pb-[16px] sm:text-[14px]">
                      <div
                        onClick={() => handleEdit(row.original)}
                        className="w-8 h-8 rounded-lg bg-blue-500 cursor-pointer flex justify-center items-center"
                      >
                        <MdEdit className=" text-white text-2xl" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="mt-4 flex justify-start">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={previousPage}
                disabled={!canPreviousPage}
                className={`flex items-center justify-center px-3 h-8 leading-tight font-semibold text-gray-700 bg-white border border-gray-300 rounded-s-lg hover:bg-green-100 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  !canPreviousPage && "cursor-not-allowed"
                }`}
              >
                Previous
              </button>
            </li>
            {pageOptions.map((page, index) => (
              <li key={index}>
                <button
                  onClick={() => gotoPage(page)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-green-100 hover:text-green-700 dark:border-green-700 dark:hover:bg-gray-700 dark:hover:text-white ${
                    pageIndex === page
                      ? "text-green-500 bg-green-50 hover:bg-green-100 hover:text-green-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={nextPage}
                disabled={!canNextPage}
                className={`flex items-center justify-center px-3 h-8 leading- font-semibold text-gray-700 bg-white border border-gray-300 rounded-e-lg hover:bg-green-100 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  !canNextPage && "cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default AmbilSampah;
