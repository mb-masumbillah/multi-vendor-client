import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDesignation = () => {
  const axiosSecure = useAxiosSecure();

  const { data: user = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/me");
      return res.data;
    },
  });


  return [user];
};

export default useDesignation;
