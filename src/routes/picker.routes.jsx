import {
  RiCopperCoinLine,
  RiDashboard2Line,
  RiTokenSwapLine,
} from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import Dashboard from "../views/Thrower/dashboard/Index";
<<<<<<< HEAD
import KategoriSampah from "../views/Picker/Kategori/Index";
import NilaiKoin from "../views/Picker/NilaiKoin/Index";
import TukarKoin from "../views/Picker/TukarKoin/Index";
import AmbilSampah from "../views/Picker/AmbilSampah/Index";
import { MdPerson } from "react-icons/md";
import ProfilePicker from "../views/Picker/Profile/Index";
=======
import Koinku from "../views/Thrower/koinku/Index";
import KategoriSampah from "../views/picker/Kategori";
import NilaiKoin from "../views/picker/NilaiKoin";
>>>>>>> 9ed8d07a998326069cc5ab2a70b6eff537d97988
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
    component: <AmbilSampah />,
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
    component: <TukarKoin />,
  },
  {
    name: "Profile",
    layout: "/picker",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProfilePicker />,
  },
];
export default PickerRoutes;
