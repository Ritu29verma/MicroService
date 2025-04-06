import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import bgImage from "../assets/bg1.jpg";
import { loginUser } from "../controllers/authcontrollers";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";



export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = async () => {
    const credentials = { email, password };

    try {
      await validationSchema.validate(credentials, { abortEarly: false });

      const response = await loginUser(credentials);

      if (response.token) {
        toast.success("Login successful!");
        dispatch(setCredentials({ token: response.token, user: response.user }));
        navigate("/register-organization");
      } else {
        toast.error(response.message);
      }
    } catch (validationErrors) {
      validationErrors.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center overflow-auto text-black px-4 sm:px-0">
    
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.6 }}
      ></div>

      <div className="inputRegion relative w-full sm:w-2/3 md:w-1/3 flex items-center justify-center flex-col">
        <div className="font-bold m-9 text-3xl sm:text-4xl text-center">
          Login to start 
          <div>your journey with us</div>
        </div>

        {/* Email Field */}
        <TextInput
          label="Email"
          placeholder="Enter your email"
          className="mb-4 sm:mb-6 text-black w-full"
          value={email}
          setValue={setEmail}
        />

        {/* Password Field */}
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
          className="text-black w-full"
        />

        {/* Login Button */}
        <div className="w-full flex items-center justify-center my-6 sm:my-8">
          <button
            className="bg-black text-white font-semibold p-3 px-6 sm:px-10 rounded-full w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            LOG IN
          </button>
        </div>

        <div className="w-full border border-solid border-gray-300"></div>

        {/* Don't have an account */}
        <div className="my-4 sm:my-6 font-bold text-xl text-center">
          Don't have an account?
        </div>
        <Link  to="/signup" className="border border-white bg-black text-white w-full flex items-center justify-center py-3 sm:py-4 rounded-full font-bold">
       
          SIGN UP
        
        </Link>
      </div>
    </div>
  );
};

export default Login;
