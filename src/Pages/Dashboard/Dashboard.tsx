import useDesignation from "../../hooks/useDesignation";
import AdminRoute from "../../Router/AdminRoute";
import UserRoute from "../../Router/UserRoute";
import VendorRoute from "../../Router/VendorRoute";

const Dashboard = () => {
  const [user] = useDesignation();
  return (
    <div>
      This is Dashboard component


      {user?.data?.role === "admin" && <AdminRoute />}
      {user?.data?.role === "user" && <UserRoute />}
      {user?.data?.role === "vendor" && <VendorRoute />}
 

      all User Show this page
    </div>
  );
};

export default Dashboard;
