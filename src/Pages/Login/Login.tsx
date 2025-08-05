/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import authImg from "../../assets/auth.svg";
import Form from "../../component/form/Form";
import Input from "../../component/form/Input";

import useAuth from "../../hooks/useAuth";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "../../component/ui/Spinner";

const Login = () => {
  const { loginUser, google } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = (data: FieldValues) => {
    const toasterId = toast.success("logging in");

    setLoading(true);

    loginUser(data.email, data.password)
      .then((result) => {
        if (result) {
          toast.success("login success", { id: toasterId, duration: 2000 });
          setLoading(false);
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 200);
        }
      })
      .catch((_error) => {
        toast.error("login faild", { id: toasterId, duration: 2000 });
        setLoading(false);
      });
  };

  const handleGoogle = () => {
    const toasterId = toast.loading("google loading...");
    setLoading(true);
    google()
      .then((result) => {
        if (result) {
          console.log(result);
          toast.success("success", { id: toasterId, duration: 2000 });
          setLoading(false);
          // setTimeout(() => {
          //   navigate("/");
          // }, 2000);
        }
      })
      .catch(() => {
        toast.error("failed !", { id: toasterId, duration: 2000 });
        setLoading(false);
      });
  };

  return (
    <div className=" flex items-center justify-center flex-row-reverse">
      <div className="w-full h-full flex justify-center items-center">
        <img src={authImg} alt="" className="w-[500px]" />
      </div>

      <div className="w-full bg-[#e2e6ed] min-h-screen flex justify-center items-center py-10">
        <div className=" px-20  w-full max-w-xl">
          {/* Title */}
          <h2 className="text-5xl font-bold pt-5 text-center">Login</h2>
          <p className="text-lg pb-10 pt-7 text-center">
            Log in to Our <strong>TravelGate</strong> Service
          </p>

          {/* Google Button */}
          <button disabled
            onClick={handleGoogle}
            type="button"
            className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-50 transition mb-6"
          >
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

          {/* Form Starts */}
          <Form
            onSubmit={handleSubmit}
            defaultValues={{ email: "", password: "" }}
          >
            <Input label="Email" type="email" name="email" />
            <Input label="Password" type="password" name="password"></Input>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6200ED] text-white py-2 rounded hover:bg-[#6200ED] transition"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner />
                </div>
              ) : (
                <p>Login</p>
              )}
            </button>
          </Form>
          <div>
            <p className="text-gray-800 text-lg text-center pt-5">
              Already have an account?{" "}
              <Link
                to="/register"
                className="font-bold hover:underline text-[#6200ED]"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
