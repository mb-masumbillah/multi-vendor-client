import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDesignation from "../../hooks/useDesignation";

const Home = () => {
  const { logout } = useAuth();
  const [user] = useDesignation();
  const navigate = useNavigate();


    console.log({user})

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
