// pages/RegisterOrganization.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Register Your Organization</h2>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Organization Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="Organization Domain (e.g., yoursite.com)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button
        className="bg-purple-700 text-white py-2 px-6 rounded"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};

export default RegisterOrganization;
