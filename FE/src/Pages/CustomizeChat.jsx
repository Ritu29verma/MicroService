import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CustomizeChat = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [chatColor, setChatColor] = useState("#4CAF50");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi there! How can we help you?");
  const [iconUrl, setIconUrl] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/org/custom-settings`,                                 
        { chatColor, welcomeMessage, iconUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Customization saved!");
      navigate("/integration-script"); // next step
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save customization");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Customize Your Chat</h2>

      <label className="block mb-2">Chat Color</label>
      <input
        type="color"
        value={chatColor}
        onChange={(e) => setChatColor(e.target.value)}
        className="mb-4"
      />

      <label className="block mb-2">Welcome Message</label>
      <input
        className="border p-2 w-full mb-4"
        value={welcomeMessage}
        onChange={(e) => setWelcomeMessage(e.target.value)}
      />

      <label className="block mb-2">Icon URL (optional)</label>
      <input
        className="border p-2 w-full mb-4"
        placeholder="https://example.com/icon.png"
        value={iconUrl}
        onChange={(e) => setIconUrl(e.target.value)}
      />

      <button
        className="bg-purple-700 text-white py-2 px-6 rounded"
        onClick={handleSubmit}
      >
        Save & Continue
      </button>
    </div>
  );
};

export default CustomizeChat;
