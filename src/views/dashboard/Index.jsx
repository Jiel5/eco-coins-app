import { MdPeople } from "react-icons/md";
import Widget from "../../components/widget/Widget";
const Dashboard = () => {
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdPeople className="h-6 w-6" />}
          title={"Data Warga"}
          subtitle={"$340.5"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
