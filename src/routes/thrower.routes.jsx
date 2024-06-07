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
    name: "Profile",
    layout: "/thrower",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];
export default ThrowerRoutes;
