import React from "react";
import { motion } from "framer-motion";
import  Button  from "../components/button";
import bgImage from "../assets/bg1.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const HomePage = () => {
  
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navigate = useNavigate(); 
  return (
    <div className="w-full text-black min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-purple-900 text-white">
        <h1 className="text-2xl font-bold">ChatService</h1>
        <div>
        {!user ? (
        <>
          <Button className="mr-2 bg-purple-700 hover:bg-purple-800"
            onClick={() => navigate("/login")}>Login</Button>
          <Button className="bg-purple-700 hover:bg-purple-800"
            onClick={() => navigate("/signup")}>Sign Up</Button>
        </>
      ) : (
        <Button className="bg-red-600 hover:bg-red-700"
          onClick={handleLogout}>Logout</Button>
      )}
        </div>
      </nav>

      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="h-[calc(100vh-70px)]  flex flex-col justify-center items-center text-center p-10 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h2 className="text-5xl font-bold text-black max-w-2xl p-4">
          We are not just a chat service, we are connection beyond words.
        </h2>
        <Button className="mt-6 bg-purple-700 hover:bg-purple-800 px-6 py-3 text-lg text-white"
        onClick={() => navigate("/signup")}>Get Started</Button>
      </motion.section>

      {/* Services Section */}
      <section className="p-16 bg-[#f7f6f3]">
        <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-xl text-center"
          >
            <h4 className="text-xl font-semibold">Real-Time Messaging</h4>
            <p className="text-gray-700">Instantly connect with anyone, anywhere.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-xl text-center"
          >
            <h4 className="text-xl font-semibold">Secure Chats</h4>
            <p className="text-gray-700">End-to-end encryption for privacy and security.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-xl text-center"
          >
            <h4 className="text-xl font-semibold">Multi-Platform Support</h4>
            <p className="text-gray-700">Available on web, mobile, and desktop.</p>
          </motion.div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="p-10 bg-purple-100">
        <h3 className="text-3xl font-bold text-center text-purple-900 mb-6">Why Choose Us?</h3>
        <ul className="list-disc list-inside text-lg text-gray-800">
          <li>Fast and reliable chat experience</li>
          <li>AI-powered smart suggestions</li>
          <li>Seamless integration with other services</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-purple-900 text-white text-center">
        <p>&copy; 2025 ChatService. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
