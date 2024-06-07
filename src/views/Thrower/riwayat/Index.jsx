import { useState, useMemo, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "../../../components/card";
import { columnsDataBuangSampah } from "./columnsData";
import { MdSearch } from "react-icons/md";
import axios from "axios";

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

const Riwayat = () => {
  const columnsData = columnsDataBuangSampah;

  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState([]);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const idPengguna = localStorage.getItem("id") || 1;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/transaksi-sampah/pengguna/${idPengguna}`
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

  return (
    <>
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
                      if (cell.column.Header === "Pengepul") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                              {cell.value.nama}
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

export default Riwayat;
