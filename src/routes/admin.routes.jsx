import { MdHistory, MdHome } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import Dashboard from "../views/dashboard/Index";
import Sampah from "../views/sampah/Index";
import Transaksi from "../views/transaksi/Index";
import { ImCoinDollar } from "react-icons/im";
import Riwayat from "../views/riwayat/Index";
import Koinku from "../views/koinku/Index";
const AdminRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Buang Sampah",
    layout: "/admin",
    path: "sampah",
    icon: <IoMdTrash className="h-6 w-6" />,
    component: <Sampah />,
  },
  {
    name: "Transaksi",
    layout: "/admin",
    path: "transaksi",
    icon: <IoCart className="h-6 w-6" />,
    component: <Transaksi />,
  },
  {
    name: "Riwayat Transaksi",
    layout: "/admin",
    path: "riwayat",
    icon: <MdHistory className="h-6 w-6" />,
    component: <Riwayat />,
  },
  {
    name: "Koinku",
    layout: "/admin",
    path: "koinku",
    icon: <ImCoinDollar className="h-6 w-6" />,
    component: <Koinku />,
  },
];
export default AdminRoutes;
