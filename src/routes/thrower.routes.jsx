import { MdOutlineHistory } from "react-icons/md";
import {
  RiCopperCoinLine,
  RiDashboard2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import Dashboard from "../views/Thrower/dashboard/Index";
import Sampah from "../views/Thrower/sampah/Index";
import Transaksi from "../views/Thrower/transaksi/Index";
import Riwayat from "../views/Thrower/riwayat/Index";
import Koinku from "../views/Thrower/koinku/Index";
const ThrowerRoutes = [
  {
    name: "Main Dashboard",
    layout: "/thrower",
    path: "home",
    icon: <RiDashboard2Line className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Buang Sampah",
    layout: "/thrower",
    path: "sampah",
    icon: <HiOutlineTrash className="h-6 w-6" />,
    component: <Sampah />,
  },
  {
    name: "Transaksi",
    layout: "/thrower",
    path: "transaksi",
    icon: <RiExchangeDollarLine className="h-6 w-6" />,
    component: <Transaksi />,
  },
  {
    name: "Riwayat Transaksi",
    layout: "/thrower",
    path: "riwayat",
    icon: <MdOutlineHistory className="h-6 w-6" />,
    component: <Riwayat />,
  },
  {
    name: "Koinku",
    layout: "/thrower",
    path: "koinku",
    icon: <RiCopperCoinLine className="h-6 w-6" />,
    component: <Koinku />,
  },
];
export default ThrowerRoutes;
