import Dropdown from "../dropdown/index";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/avatars/avatar4.png";
const Navbar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onOpenSidenav, brandText } = props;

  return (
    <nav className="sticky top-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[500px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[27px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2  rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[200px] xl:justify-end xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-green-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              👋 Hey, Adela
            </p>{" "}
          </div>
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full xl:mr-2"
              src={avatar}
              alt="Elon Musk"
            />
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        >
          <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  👋 Hey, Adela
                </p>{" "}
              </div>
            </div>
            <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="flex flex-col p-4">
              <a
                href=" "
                className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Profile Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Newsletter Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500 hover:ease-in"
              >
                Log Out
              </a>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
