"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useRepair } from "../RepairContext";
import { getCookie } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  buildingNo: string;
  streetName: string;
  area: string;
  contactNo: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: string;
  deliveryMode: string;
  customInfo: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  buildingNo?: string;
  streetName?: string;
  area?: string;
  contactNo?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  customInfo?: string;
}

const UserDetailsPage = () => {
  const { userDetails, updateUserDetails } = useRepair();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    buildingNo: "",
    streetName: "",
    area: "",
    contactNo: "",
    city: "",
    state: "",
    pinCode: "",
    paymentMethod: "",
    deliveryMode: "",
    customInfo: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: FormErrors = {};

    if (!formState.name) newErrors.name = "Name is required.";
    if (!formState.email || !emailRegex.test(formState.email))
      newErrors.email = "Valid email is required.";
    if (!formState.contactNo || !/^\d{10}$/.test(formState.contactNo))
      newErrors.contactNo = "Contact number must be exactly 10 digits.";
    if (!formState.buildingNo) newErrors.buildingNo = "Building number is required.";
    if (!formState.streetName) newErrors.streetName = "Street name is required.";
    if (!formState.area) newErrors.area = "Area is required.";
    if (!formState.city) newErrors.city = "City is required.";
    if (!formState.state) newErrors.state = "State is required.";
    if (!formState.pinCode || !/^\d{6}$/.test(formState.pinCode))
      newErrors.pinCode = "Pin code must be exactly 6 digits.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      updateUserDetails(formState);

      // Check if userDetails is defined
      if (!userDetails) {
        console.error("User details are not defined");
        return;
      }

      const response = await axios.post(
        "https://app-api.sampurnakart.in/repairs/bookRepair",
        { ...userDetails, ...formState },
        {
          headers: {
            "x-auth-token": getCookie("token"),
          },
        }
      );

      console.log(response.data);
      router.push("/repair/confirmation");
    } catch (error: any) {
      console.error("Error booking repair:", error);
      if (error.response && error.response.status === 401) {
        router.push("/signin");
      }
    }
  };

  return (
    <div className="sm:w-[100vh] mt-28 mx-auto my-10 px-3 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-screen">
      <div className="bg-[#27187E] px-10 py-10 text-center text-white">
        <p className="font-poppins text-2xl font-semibold tracking-wider">
          Work Order Request
        </p>
        <p className="text-center text-blue-100">
          Please Fill the Details Below
        </p>
      </div>

      <div className="space-y-4 px-8 py-10">
        <label className="block">
          <p className="text-gray-600">
            Name <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>
        <label className="block">
          <p className="text-gray-600">
            Email Address <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </label>
        <label className="block">
          <p className="text-gray-600">
            Contact No <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your number"
            name="contactNo"
            value={formState.contactNo}
            onChange={handleChange}
            required
            pattern="\d{10}"
            title="Please enter exactly 10 digits"
          />
          {errors.contactNo && (
            <p className="text-red-500 text-sm">{errors.contactNo}</p>
          )}
        </label>
        <label className="block">
          <p className="text-gray-600">
            Building No <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your building number"
            name="buildingNo"
            value={formState.buildingNo}
            onChange={handleChange}
            required
          />
          {errors.buildingNo && (
            <p className="text-red-500 text-sm">{errors.buildingNo}</p>
          )}
        </label>
        <label className="block">
          <p className="text-gray-600">
            Street Name <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your street name"
            name="streetName"
            value={formState.streetName}
            onChange={handleChange}
            required
          />
          {errors.streetName && (
            <p className="text-red-500 text-sm">{errors.streetName}</p>
          )}
        </label>
        <label className="block">
          <p className="text-gray-600">
            Area <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your area"
            name="area"
            value={formState.area}
            onChange={handleChange}
            required
          />
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
        </label>
        <label className="block">
          <p className="text-gray-600">
            City <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your city"
            name="city"
            value={formState.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </label>
        <label className="block">
          <p className="text-gray-600">
            State <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your state"
            name="state"
            value={formState.state}
            onChange={handleChange}
            required
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </label>
        <label className="block">
          <p className="text-gray-600">
            Pin Code <span className="text-red-500">*</span>
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your pin code"
            name="pinCode"
            value={formState.pinCode}
            onChange={handleChange}
            required
            pattern="\d{6}"
            title="Please enter exactly 6 digits"
          />
          {errors.pinCode && (
            <p className="text-red-500 text-sm">{errors.pinCode}</p>
          )}
        </label>
        <label className="block">
          <p className="text-gray-600">
            Issue Description 
          </p>
          <textarea
            className="h-32 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            placeholder="Tell us about the issue"
            name="customInfo"
            value={formState.customInfo}
            onChange={handleChange}
            required
          ></textarea>
          {errors.customInfo && (
            <p className="text-red-500 text-sm">{errors.customInfo}</p>
          )}
        </label>
        <button
          className={`mt-4 w-full rounded-full px-10 py-2 font-semibold text-white hover:bg-orange-600 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#27187E]"}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPage;
