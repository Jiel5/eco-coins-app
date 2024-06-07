/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { BiTrash } from "react-icons/bi";
import Card from "../../../components/card";
import { columnsDataJenisSampah } from "./columnsData";
import ModalComponent from "../../../components/modal";
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit, MdSearch } from "react-icons/md";
import axios from "axios";
import Toast from "../../../components/Toast/Index";
import ModalDelete from "../../../components/modal/ModalDelete";

const KategoriSampah = () => {
  const columnsData = columnsDataJenisSampah;

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
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/sampah`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
      setTableData(response.data);
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
            id: "id_sampah", // Change this to the actual ID column key
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

  const [jenisSampah, setJenisSampah] = useState("");
  const [nilaiKoin, setNilaiKoin] = useState("");
  const handleAngka = (e) => {
    const { value } = e.target;
    const regex = /^[0-9]*$/;

    if (regex.test(value)) {
      setNilaiKoin(value);
    }
  };

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
    setJenisSampah("");
    setNilaiKoin("");
    setId("");
    setModalIsOpen(false);
    setIsEdit(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleCloseModalDelete = () => {
    setModalIsOpenDelete(false);
    setId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/sampah`,
          {
            jenis_sampah: jenisSampah,
            nilai_koin_per_kg: Number(nilaiKoin),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );
        handleCloseModal();
        showToastHandler({
          show: true,
          message: "Kategori sampah ditambahkan!",
          type: "success",
        });
        fetchData(); // Refresh the data after successful submission
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/sampah/${id}`,
          {
            jenis_sampah: jenisSampah,
            nilai_koin_per_kg: Number(nilaiKoin),
          }
        );
        

        handleCloseModal();
        showToastHandler({
          show: true,
          message: "Kategori sampah diperbarui!",
          type: "update",
        });
        fetchData(); // Refresh the data after successful submission
        setIsEdit(false);
        setId("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (data) => {
    setModalIsOpen(true);
    setJenisSampah(data.jenis_sampah);
    setNilaiKoin(data.nilai_koin_per_kg);
    setId(data.id_sampah);
    setIsEdit(true);
  };

const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const res = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}/sampah/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      }
    );

    showToastHandler({
      show: true,
      message: "Kategori sampah dihapus!",
      type: "delete",
    });
    fetchData();
    setModalIsOpenDelete(false);
    setId("");
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
          <h2 className="text-xl font-medium font-sans">
            Form Kategori Sampah
          </h2>
          <div id="inputJenis" className="mt-4">
            <label htmlFor="jenisSampah" className="font-medium">
              Jenis Sampah
            </label>
            <input
              type="text"
              id="jenisSampah"
              name="jenisSampah"
              value={jenisSampah}
              onChange={(e) => setJenisSampah(e.target.value)}
              placeholder="masukkan jenis sampah"
              className="mt-1 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
          </div>
          <div id="inputNilai" className="mt-2">
            <label htmlFor="password" className="font-medium">
              Nilai Koin per Kg Sampah
            </label>
            <input
              type="text"
              id="nilai"
              name="nilai"
              value={nilaiKoin}
              onChange={handleAngka}
              placeholder="masukkan nilai koin"
              className="mt-1 text-md border border-gray-900 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
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
              className=" bg-blue-500  text-white font-medium py-1 px-4 rounded-md font-sans"
            >
              {isEdit ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </ModalComponent>
      {/* modal end */}

      {/* modal delete */}
      <ModalDelete
        message={"Apakah anda yakin ingin menghapus kategori sampah?"}
        modalIsOpenDelete={modalIsOpenDelete}
        setModalIsOpenDelete={setModalIsOpenDelete}
        handleDelete={handleDelete}
      />
      {/* modalDelete */}

      <Card extra={"w-full sm:overflow-auto p-4"}>
        {/* Header */}
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Kategori Sampah
          </div>
        </header>
        {/* search */}
        <div className="flex items-center w-full mt-2 justify-between">
          <button
            onClick={() => setModalIsOpen(true)}
            className="px-6 py-2 lg:text-lg mr-8 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
          >
            <FaPlusCircle className="mr-2 w-4 h-4" /> Tambah
          </button>
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
                      if (cell.column.Header === "Jenis Sampah") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Nilai Koin Per KG") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value} Koin
                            </p>
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
                      <div
                        onClick={() => {
                          setId(row.original.id_sampah);
                          setModalIsOpenDelete(true);
                        }}
                        className="w-8 h-8 rounded-lg bg-red-500 cursor-pointer flex justify-center items-center"
                      >
                        <BiTrash className="cursor-pointer text-white text-2xl" />
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

export default KategoriSampah;
