import { useState, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "../../../components/card";
import { columnsDataRiwayat } from "./columnsDataRiwayat";
import tableRiwayat from "./tableRiwayat.json";

const Riwayat = () => {
  const columnsData = columnsDataRiwayat;
  const tableData = tableRiwayat;
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 1, globalFilter },
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
    state: { pageIndex },
  } = tableInstance;

  const handleSearchChange = (e) => {
    setGlobalFilter(e.target.value);
    setTableGlobalFilter(e.target.value);
  };

  const handleStruk = (row) => {
    // const { id, nama, alamat, struk, bayar } = row;
    console.log({ row });
  };

  return (
    <Card extra={"w-full sm:overflow-auto p-4"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Tabel Riwayat Transaksi
        </div>
      </header>
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={globalFilter}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="mr-2 w-1/4 max-w-lg rounded border border-gray-300 p-2"
        />
      </div>

      <div className="mt-6 overflow-x-scroll xl:overflow-x-hidden">
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
                <tr {...row.getRowProps()} key={index}>
                  <td className="pt-[14px] pb-[16px] sm:text-[14px]">
                    {pageIndex * page.length + index + 1}
                  </td>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Nama") {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Alamat") {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Struk") {
                      data = (
                        <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                          <button onClick={() => handleStruk(row.original)}>
                            {cell.value}
                          </button>
                        </p>
                      );
                    } else if (cell.column.Header === "Bayar") {
                      data = (
                        <p className="text-sm lg:text-md font-semibold text-navy-700 dark:text-white">
                          Rp. {Intl.NumberFormat("id-ID").format(cell.value)}
                        </p>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
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
  );
};

export default Riwayat;
