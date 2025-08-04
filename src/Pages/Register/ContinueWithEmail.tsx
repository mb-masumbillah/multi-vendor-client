/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import authImg from "../../assets/auth.svg";

import Form from "../../component/form/Form";
import Input from "../../component/form/Input";
import SelectField from "../../component/form/SelectField";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Spinner from "../../component/ui/Spinner";
import { useState } from "react";

const ContinueWithEmail = () => {
  const { createUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FieldValues) => {
    const toasterId = toast.loading("Registering in");
    setLoading(true);

    const userData = {
      name: data.name,
      email: data.email,
      number: data.number,
      gender: data.gender,
    };

    // const formData = {
    //   data: JSON.stringify(userData),
    //   file: data.profile_picture,
    // };

    await axiosPublic.post("/user/create-user", userData).then((res) => {
      if (res.data) {
        createUser(data.email, data.password)
          .then( () => {
            toast.success("Register success 😊", {
              id: toasterId,
              duration: 2000,
            });
            setLoading(false);
            setTimeout(() => {
              navigate("/");
            }, 200);
          })
          .catch((_error) => {
            toast.error("Register Failed ! 😞", {
              id: toasterId,
              duration: 2000,
            });
            setLoading(false);
          });
      }
    });
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full h-full flex justify-center items-center">
        <img src={authImg} alt="" className="w-[500px]" />
      </div>

      <div className="w-full bg-[#e2e6ed] min-h-screen flex justify-center items-center py-10">
        <div className=" px-20  w-full max-w-xl">
          {/* Title */}
          <h2 className="text-5xl font-bold pt-5 text-center">Register</h2>
          <p className="text-lg pb-10 pt-7 text-center">
            Sign Up to Our <strong>TravelGate</strong> Service
          </p>

          {/* Form Starts */}
          <Form
            onSubmit={handleSubmit}
            defaultValues={{
              name: "",
              email: "",
              password: "",
              number: "",
              gender: "",
              // profile_picture: undefined as unknown as FileList,
            }}
          >
            <Input label="Full Name" type="text" name="name" />

            <Input label="Email" type="email" name="email" />

            <Input label="Password" type="password" name="password" />

            <Input label="Phone Number" type="number" name="number" />

            {/* Profile Picture Upload */}

            {/* <FileInput
              name="profile_picture"
              label="Profile Picture"
              rules={{ required: "Profile picture is required" }}
            /> */}

            <SelectField
              name="gender"
              label="Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Others", value: "others" },
              ]}
            />

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
                <p>Register</p>
              )}
            </button>
          </Form>
          <div>
            <p className="text-gray-800 text-lg text-center pt-5">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold hover:underline text-[#6200ED]"
              >
                Login Here
              </Link>
            </p>
            <p className="text-gray-800 text-lg text-center pt-5">
              If you want to become a vendor?{" "}
              <Link
                to="/register/vendor"
                className="font-bold hover:underline text-[#6200ED]"
              >
                Vendor Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueWithEmail;
