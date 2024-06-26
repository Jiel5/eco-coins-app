import { MdOutlineHistory, MdPerson } from "react-icons/md";
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
import Profile from "../views/Thrower/profile/Index";
import TransaksiKoin from "../views/Thrower/transaksiKoin";
import RiwayatTransaksiKoin from "../views/Thrower/riwayatTukarKoin";
import { FaCoins } from "react-icons/fa6";
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
  {
    name: "Tukar Koin",
    layout: "/thrower",
    path: "tukar-koin",
    icon: <FaCoins className="h-6 w-6" />,
    component: <TransaksiKoin />,
  },
  {
    name: "Riwayat Tukar Koin ",
    layout: "/thrower",
    path: "history-redeem-koin",
    icon: <MdOutlineHistory className="h-6 w-6" />,
    component: <RiwayatTransaksiKoin />,
  },
  {
    name: "Profile",
    layout: "/thrower",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];
export default ThrowerRoutes;
