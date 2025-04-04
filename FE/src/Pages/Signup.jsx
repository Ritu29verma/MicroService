import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput"; // make sure this supports toggle eye
import bgImage from "../assets/bg1.jpg";
import * as yup from "yup";
import { signupUser } from "../controllers/authcontrollers";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSignup = async () => {
    const userData = { name, email, password, confirmPassword };

    try {
      await validationSchema.validate(userData, { abortEarly: false });

      const response = await signupUser({ name, email, password });

      if (response.success) {
        toast.success("Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(response.message || "Signup failed!");
      }
    } catch (validationErrors) {
      if (validationErrors.inner) {
        validationErrors.inner.forEach(error => {
          toast.error(error.message);
        });
      } else {
        toast.error("Validation failed!");
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center overflow-auto text-black px-4 sm:px-0 bg-cover bg-center bg-no-repeat">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.7 }}
      ></div>

      <div className="inputRegion relative text-black w-full sm:w-2/3 md:w-1/3 flex items-center justify-center flex-col">
        <div className="font-bold mt-4 mb-4 text-3xl sm:text-4xl text-center">
          Sign up to start 
          <div>your journey with us</div>
        </div>

        <TextInput
          label="Name"
          placeholder="Enter your Name"
          className="my-2 sm:my-3 text-black w-full"
          type="text"
          value={name}
          setValue={setName}
        />

        <TextInput
          label="Email address"
          placeholder="name@domain.com"
          className="mb-2 sm:mb-3 text-black w-full"
          type="email"
          value={email}
          setValue={setEmail}
        />

       

        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password"
          value={password}
          setValue={setPassword}
          className="text-black w-full"
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          className="text-black w-full"
        />

        <div className="w-full flex items-center justify-center my-4 sm:my-4">
          <button
            className="bg-black text-white font-semibold p-3 px-6 sm:px-10 rounded-full w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            Sign Up
          </button>
        </div>

        <div className="w-full border border-solid border-gray-300"></div>

        <div className="my-2 sm:my-2 font-bold text-xl text-center">
          Already have an account?
        </div>
        <Link to="/login" className="border mb-5 border-white bg-black text-white w-full flex items-center justify-center py-3 sm:py-4 rounded-full font-bold">
          LOG IN INSTEAD
        </Link>
      </div>
    </div>
  );
};

export default Signup;
