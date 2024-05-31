import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { MdCheck, MdClose, MdEdit } from "react-icons/md";

const Toast = ({ message, icon, onClose }) => {
  // Tentukan ikon berdasarkan prop "icon"
  let toastIcon;
  let bgIcon;
  switch (icon) {
    case "success":
      toastIcon = <MdCheck className="w-5 h-5 text-green-500" />;
      bgIcon = "bg-green-100";
      break;
    case "delete":
      toastIcon = <BiTrash className="w-5 h-5 text-red-500" />;
      bgIcon = "bg-red-100";
      break;
    case "update":
      toastIcon = <MdEdit className="w-5 h-5 text--500" />;
      bgIcon = "bg-yellow-100";
      break;
    default:
      toastIcon = <MdCheck className="w-5 h-5 text-green-500" />;
  }

  // Panggil fungsi onClose setelah interval selesai
  useEffect(() => {
    const timeout = setTimeout(onClose, 5000); // Setelah 5 detik (5000 milidetik)
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      id="toast-default"
      className={`animate-fade shadow-xl border border-gray-300 flex absolute bottom-2 right-2 z-10 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg dark:text-gray-400 dark:bg-gray-800`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${bgIcon} rounded-full dark:bg-blue-800 dark:text-blue-200`}
      >
        {toastIcon}
      </div>
      <div className="ms-3 text-sm font-medium text-gray-700">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <MdClose className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;
