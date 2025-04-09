import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput";
import toast from "react-hot-toast";
import bgImage from "../assets/bg1.jpg";

const RegisterOrganization = () => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");

  const tokenFromRedux = useSelector((state) => state.auth.token);
  const token = tokenFromRedux || sessionStorage.getItem('token');
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/org/registerOrg`,
        { name, domain },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Organization registered!");
      navigate("/customize-chat"); // Next step
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-100 overflow-auto">
     
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          opacity: 0.2,
        }}
      ></div>

      <div className="z-10 w-full max-w-2xl p-10 mx-4 sm:mx-6 md:mx-8 lg:mx-auto">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
          Register Your Organization
        </h2>

        <p className="text-gray-600 mb-8 text-center">
          Enter your organization details to get started with your dashboard.
        </p>

        <div className="space-y-6">
  <div>
    <label className="block mb-2 font-medium text-gray-700">Organization Name</label>
    <input
      type="text"
      placeholder="Enter Organization Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full p-3 border border-gray-900 border-solid rounded placeholder-gray-500 bg-blue-100"
    />
  </div>

  <div>
    <label className="block mb-2 font-medium text-gray-700">Organization Domain</label>
    <input
      type="text"
      placeholder="e.g., yourcompany.com"
      value={domain}
      onChange={(e) => setDomain(e.target.value)}
      className="w-full p-3 border border-gray-900 border-solid rounded placeholder-gray-500 bg-blue-100"
    />
  </div>

  <button
    className="w-1/2 mx-auto flex items-center justify-center mt-16 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold text-lg transition duration-300"
    onClick={handleSubmit}
  >
    Continue
  </button>
</div>

      </div>
    </div>
  );
};

export default RegisterOrganization;
