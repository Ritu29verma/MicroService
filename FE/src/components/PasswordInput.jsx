// components/PasswordInput.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ label, placeholder, value, setValue, className }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=" w-full p-3 border border-gray-900 border-solid rounded placeholder-gray-500 bg-blue-100"
        />
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
          onClick={() => setShow(!show)}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
