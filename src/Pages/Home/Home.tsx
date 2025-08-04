import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="">
      <button onClick={handleLogout}>Logout</button>
      <br />
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Home;
