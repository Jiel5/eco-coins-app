import { MdOutlineHistory } from "react-icons/md";
import {
  RiCopperCoinLine,
  RiDashboard2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import Dashboard from "../views/dashboard/Index";
import Sampah from "../views/sampah/Index";
import Transaksi from "../views/transaksi/Index";
import Riwayat from "../views/riwayat/Index";
import Koinku from "../views/koinku/Index";
const AdminRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <RiDashboard2Line className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Buang Sampah",
    layout: "/admin",
    path: "sampah",
    icon: <HiOutlineTrash className="h-6 w-6" />,
    component: <Sampah />,
  },
  {
    name: "Transaksi",
    layout: "/admin",
    path: "transaksi",
    icon: <RiExchangeDollarLine className="h-6 w-6" />,
    component: <Transaksi />,
  },
  {
    name: "Riwayat Transaksi",
    layout: "/admin",
    path: "riwayat",
    icon: <MdOutlineHistory className="h-6 w-6" />,
    component: <Riwayat />,
  },
  {
    name: "Koinku",
    layout: "/admin",
    path: "koinku",
    icon: <RiCopperCoinLine className="h-6 w-6" />,
    component: <Koinku />,
  },
];
export default AdminRoutes;
