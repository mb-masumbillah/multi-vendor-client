import useDesignation from "../../hooks/useDesignation";
import VendorRoute from "../../Router/VendorRoute";

const Dashboard = () => {
  const [user] = useDesignation();
  return <div>{user?.data?.role === "vendor" && <VendorRoute />}</div>;
};

export default Dashboard;
