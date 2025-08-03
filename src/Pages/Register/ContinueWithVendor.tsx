/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Form from "../../component/form/Form";
import Input from "../../component/form/Input";
import SelectField from "../../component/form/SelectField";
import type { FieldValues } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "sonner";
import Spinner from "../../component/ui/Spinner";
import { useState } from "react";

const defaultValues = {
  ownerName: "",
  email: "",
  password: "",
  companyPhone: "",
  gender: "",
  vendorDetails: {
    companyName: "",
    transportType: "",
    companyAddress: "",
  },
};

const ContinueWithVendor = () => {
  const { createUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: FieldValues) => {
    const toasterId = toast.loading("vendor createing...");
    setLoading(true);
    const vendor = {
      name: data.ownerName,
      number: data.companyPhone,
      gender: data.gender,
      vendorDetails: {
        companyName: data.vendorDetails.companyName,
        transportType: data.vendorDetails.transportType,
        companyAddress: data.vendorDetails.companyAddress,
      },
      email: data.email,
    };

    createUser(data?.email, data?.password)
      .then(async () => {
        await axiosPublic.post("/user/create-vendor", vendor).then((res) => {
          if (res.data) {
            toast.success("vendor create success 😊", {
              id: toasterId,
              duration: 2000,
            });
            setLoading(false);
            navigate("/");
          }
        });
      })
      .catch((_error) => {
        toast.error("vendor create failed! 😞");
        setLoading(false);
      });
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl bg-[#eee4e4b1] backdrop-blur-lg rounded-xl shadow-lg p-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#6310d8]">
          Vendor Registration
        </h2>
        <p className="text-center text-black mt-2 mb-6 text-lg">
          Register your company with{" "}
          <strong className="text-[#6310d8]">TravelGate</strong>
        </p>

        <Form onSubmit={handleSubmit} defaultValues={defaultValues}>
          {/* 2 Column Form Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              name="vendorDetails.companyName"
              type="text"
            />
            <Input label="Owner / Manager Name" name="ownerName" type="text" />
            <Input label="Email" name="email" type="email" />
            <Input label="Password" name="password" type="password" />

            <Input
              label="Company Phone Number"
              name="companyPhone"
              type="text"
            />
            <SelectField
              name="gender"
              label="Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Others", value: "others" },
              ]}
            />
            <SelectField
              name="vendorDetails.transportType"
              label="Transport Type"
              options={[
                { label: "Bus", value: "bus" },
                { label: "Train", value: "train" },
                { label: "Ship", value: "ship" },
                { label: "Airplane", value: "airplane" },
              ]}
            />
            <Input
              label="Company Address"
              name="vendorDetails.companyAddress"
              type="text"
            />

            {/* <FileInput
              name="vendorDetails.companyLogo"
              label="Company Logo"
              rules={{ required: "Company logo is required" }}
            />

            <FileInput
              name="vendorDetails.tradeLicense"
              label="Trade License / NID"
              rules={{ required: "Document is required" }}
            /> */}
          </div>

          <button
            type="submit"
            className="w-full bg-[#6200ED] cursor-pointer text-white py-3 mt-6 rounded-lg hover:bg-[#4a00c9] transition-all duration-300"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-3">
                <Spinner />
              </div>
            ) : (
              <p>Register as Vendor</p>
            )}
          </button>
        </Form>

        <div className="pt-6 text-center">
          <p className="text-black">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-[#6200ED] underline font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContinueWithVendor;
