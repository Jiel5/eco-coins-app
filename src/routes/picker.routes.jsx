import {
  RiCopperCoinLine,
  RiDashboard2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import Dashboard from "../views/Thrower/dashboard/Index";
import KategoriSampah from "../views/picker/Kategori";
import NilaiKoin from "../views/picker/NilaiKoin";
import AmbilSampah from "../views/picker/AmbilSampah";
import RiwayatTransakasi from "../views/picker/Riwayat";
import TransaksiKoinPicker from "../views/picker/transaksiKoin";
import { MdOutlineHistory} from "react-icons/md";
import RiwayatTransaksiKoinPengepul from "../views/picker/RiwayatTukarKoin";

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
    name: "Riwayat Transaksi",
    layout: "/picker",
    path: "riwayat-transaksi-pengepul",
    icon: <MdOutlineHistory className="h-6 w-6" />,
    component: <RiwayatTransakasi />,
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
    path: "redeem",
    icon: <RiExchangeDollarLine className="h-6 w-6" />,
    component: <TransaksiKoinPicker />,
  },
  {
    name: "Riwayat Tukar Koin",
    layout: "/picker",
    path: "history-tukarKoin",
    icon: <MdOutlineHistory className="h-6 w-6" />,
    component: <RiwayatTransaksiKoinPengepul />,
  },
];
export default PickerRoutes;
