import { MdManageAccounts, MdPeople } from "react-icons/md";
import Widget from "../../../components/widget/Widget";
import { RiExchangeDollarLine } from "react-icons/ri";
const Dashboard = () => {
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdPeople className="h-6 w-6" />}
          title={"Data Warga"}
          subtitle={"2000"}
        />
        <Widget
          icon={<MdManageAccounts className="h-6 w-6" />}
          title={"Pengguna Aplikasi"}
          subtitle={"2000"}
        />
        <Widget
          icon={<RiExchangeDollarLine className="h-6 w-6" />}
          title={"Riwayat Transaksi"}
          subtitle={"2000"}
        />
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-sans font-semibold">Tentang Aplikasi</h1>
        <p className="text-justify mt-5">
          Eco Coins adalah platform yang bertujuan untuk membantu Anda mengelola
          sampah dengan cara yang lebih berkelanjutan dan menguntungkan. Dengan
          Eco Coins, Anda dapat dengan mudah mendaur ulang sampah Anda tanpa
          ribet. Kami menyediakan fasilitas untuk memasukkan jenis dan berat
          sampah Anda, dan dalam sekejap, Anda akan mendapatkan insentif berupa
          koin yang dapat ditukar dengan hadiah atau uang tunai. Kami percaya
          bahwa berkontribusi pada lingkungan yang lebih baik haruslah menjadi
          pengalaman yang mudah dan bermanfaat bagi semua orang. Dengan
          Eco Coins, Anda tidak hanya membantu mengurangi limbah yang mencemari
          lingkungan, tetapi juga memiliki kesempatan untuk mendapatkan manfaat
          dari upaya Anda. Bergabunglah dengan komunitas Eco Coins sekarang dan
          mari bersama-sama menjadikan dunia lebih bersih, lebih hijau, dan
          lebih berkelanjutan.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
