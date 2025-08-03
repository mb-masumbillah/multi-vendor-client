import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});
const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("accessToken");

      config.headers.authorization = token;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function onFulfilled(response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logout();
        navigate("/login");
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
