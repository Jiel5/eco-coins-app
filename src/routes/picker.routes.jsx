import {
  RiCopperCoinLine,
  RiDashboard2Line,
  RiTokenSwapLine,
} from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import Dashboard from "../views/Thrower/dashboard/Index";
import Koinku from "../views/Thrower/koinku/Index";
import KategoriSampah from "../views/Picker/Kategori/Index";
import NilaiKoin from "../views/Picker/NilaiKoin/Index";
const PickerRoutes = [
  {
    name: "Main Dashboard",
    layout: "/picker",
    path: "home",
    icon: <RiDashboard2Line className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Ambil Sampah",
    layout: "/picker",
    path: "ambil",
    icon: <HiOutlineTrash className="h-6 w-6" />,
    component: <Koinku />,
  },
  {
    name: "Kategori Sampah",
    layout: "/picker",
    path: "kategori",
    icon: <HiOutlineTrash className="h-6 w-6" />,
    component: <KategoriSampah />,
  },
  {
    name: "Nilai Koin",
    layout: "/picker",
    path: "koin",
    icon: <RiCopperCoinLine className="h-6 w-6" />,
    component: <NilaiKoin />,
  },
  {
    name: "Tukar Koin",
    layout: "/picker",
    path: "tukar",
    icon: <RiTokenSwapLine className="h-6 w-6" />,
    component: <Koinku />,
  },
];
export default PickerRoutes;
