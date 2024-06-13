import {
  RiCopperCoinLine,
  RiDashboard2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineHistory } from "react-icons/md";
import Dashboard from "../views/Thrower/dashboard/Index";
import AmbilSampah from "../views/Picker/AmbilSampah/Index.jsx";
import RiwayatTransaksi from "../views/Picker/Riwayat/Index.jsx";
import KategoriSampah from "../views/Picker/Kategori/Index.jsx";
import NilaiKoin from "../views/Picker/NilaiKoin/Index.jsx";
import RiwayatTransaksiKoinPengepul from "../views/Picker/RiwayatTukarKoin/Index.jsx";
import TransaksiKoinPicker from "../views/Picker/transaksiKoin/Index.jsx";

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
    component: <RiwayatTransaksi />,
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
