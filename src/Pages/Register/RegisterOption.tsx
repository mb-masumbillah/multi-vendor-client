import { FaFileContract } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Spinner from "../../component/ui/Spinner";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

const btnStyle =
  "text-xl text-center border rounded-2xl px-44 py-2 flex items-center justify-center gap-2 font-semibold cursor-pointer";

const RegisterOption = () => {
  const { google } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const axiosPublic = useAxiosPublic()

  const handleGoogle = async() => {
    const toasterId = toast.loading("google loading...");
    setLoading(true);

        // await axiosPublic.post("/user/create-user", userData).then((res) => {

        // })

    google()
      .then((result) => {
        if (result) {

          console.log(result)
          toast.success("success", { id: toasterId, duration: 2000 });
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch(() => {
        toast.error("failed !", { id: toasterId, duration: 2000 });
        setLoading(false);
      });
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/bg2.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto bg-[#e2e6ed9e] backdrop-blur-md p-10 rounded-xl flex flex-col items-center -mt-20">
        <div className="text-center space-y-5">
          <h1 className="text-[#6200ED] text-5xl font-bold">TravelGate</h1>
          <p className="text-2xl font-semibold">Want to join with us</p>
        </div>

        <div className="flex flex-col gap-5 mt-10 w-full">
          <Link to="/register/user" className={btnStyle}>
            <MdOutlineEmail /> Continue with Email
          </Link>

          <button disabled onClick={handleGoogle} className={btnStyle}>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </>
            )}
          </button>

          <Link to="/register/vendor" className={btnStyle}>
            <FaFileContract /> Continue as a Vendor
          </Link>

          <p className="text-gray-800 text-lg text-center pt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold hover:underline text-[#6200ED]"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterOption;
