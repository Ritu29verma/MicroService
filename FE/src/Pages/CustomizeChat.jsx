import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaTimes, FaBars } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import bgImage from "../assets/bg1.jpg";

const colorOptions = ["#007bff", "#dc3545", "#6f42c1", "#28a745", "#03A84E"];

const CustomizeChat = () => {
  const tokenFromRedux = useSelector((state) => state.auth.token);
  const token = tokenFromRedux || sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [chatColor, setChatColor] = useState("#03A84E");
  const [welcomeMessage, setWelcomeMessage] = useState("👋 Hi! How can we help?");
  const [iconUrl, setIconUrl] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: "agent",
      text: "👋 Hi! How can we help?",
    },
  ]);
  const [suggestedMessages, setSuggestedMessages] = useState([
    "I have a question",
    "Tell me more",
  ]);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMenu = () => setShowMenu(!showMenu);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIconFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconUpload = async () => {
    if (!iconFile) return null;

    const formData = new FormData();
    formData.append("icon", iconFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.imageUrl;
    } catch (err) {
      toast.error("Upload failed");
      return null;
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      sender: "user",
      text: inputMessage.trim(),
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleAddMessage = () => {
    setSuggestedMessages([...suggestedMessages, ""]);
  };

  const handleDeleteMessage = (index) => {
    setSuggestedMessages(suggestedMessages.filter((_, i) => i !== index));
  };

  const handleChangeMessage = (index, value) => {
    const newMessages = [...suggestedMessages];
    newMessages[index] = value;
    setSuggestedMessages(newMessages);
  };

  const handleSubmit = async () => {
    let uploadedUrl = iconUrl;

    if (iconFile) {
      uploadedUrl = await handleIconUpload();
      if (!uploadedUrl) return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/org/custom-settings`,
        {
          chatColor,
          welcomeMessage,
          iconUrl: uploadedUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Customization saved!");
      navigate("/integration-script");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save customization");
    }
  };

  return (
    <div className="relative min-h-screen p-6 md:p-12 bg-gray-50 flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.7 }}
      ></div>

      <div className="relative max-w-6xl w-full bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row gap-10">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Customize the widget to suit your brand
          </h2>
          <p className="text-sm text-gray-500 mb-6">(you can change this later)</p>

       
          <div className="mb-6">
          <label className="block text-gray-700 mb-2">Logo (optional)</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {iconUrl && (
              <div className="w-12 h-12 bg-gray-100 border rounded-md flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src={iconUrl}
                  alt="Chat Logo"
                  className="object-contain h-full w-full"
                />
              </div>
            )}
          </div>
        </div>


          {/* Color Picker */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Color</label>
            <div className="flex items-center gap-3 mb-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    chatColor === color ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setChatColor(color)}
                />
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={chatColor}
                  onChange={(e) => setChatColor(e.target.value)}
                  className="w-10 h-10 p-0 border-none cursor-pointer"
                  title="Choose color"
                />
                <input
                  type="text"
                  value={chatColor}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^#([0-9A-F]{3}){1,2}$/i.test(val) || val === "") {
                      setChatColor(val);
                    }
                  }}
                  placeholder="#03A84E"
                  className="border p-2 rounded w-32"
                />
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Welcome Message</label>
            <textarea
              className="w-full border p-2 rounded"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
            />
          </div>

          {/* Suggested Messages */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Suggested message</label>
            {suggestedMessages.map((msg, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => handleChangeMessage(index, e.target.value)}
                  className="flex-1 border p-2 rounded"
                />
                <button
                  onClick={() => handleDeleteMessage(index)}
                  className="text-red-500"
                >
                  <RiDeleteBin5Line />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddMessage}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              + Add Message
            </button>
          </div>

          {/* Submit Button */}
          <button
            className="bg-purple-700 text-white py-3 px-6 rounded mt-4"
            onClick={handleSubmit}
          >
            Save & Continue
          </button>
        </div>

        {/* Right Side - Live Preview */}
        <div>
          <button
            className="fixed bottom-14 right-36 bg-green-600 hover:bg-green-700 p-4 rounded-full shadow-lg text-white text-2xl z-50"
            onClick={toggleChat}
          >
            <BsChatDotsFill />
          </button>

          {isOpen && (
            <div className="fixed bottom-30 right-42 w-[360px] min-h-[500px] bg-white shadow-lg rounded-lg border overflow-hidden z-40 flex flex-col">
              {/* Header */}
              <div
                className="flex justify-between items-center px-4 py-3"
                style={{ backgroundColor: chatColor }}
              >
                <span className="text-white text-lg font-medium">Chat</span>
                <div className="flex items-center gap-4 text-white text-xl">
                  <button onClick={toggleMenu}>
                    <FaBars />
                  </button>
                  <button onClick={toggleChat}>
                    <FaTimes />
                  </button>
                </div>

                {showMenu && (
                  <div className="absolute top-14 right-6 bg-white shadow-md rounded-md w-48 text-sm z-50 border">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Change Name
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Pop Out Widget
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Email Transcript
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Add to your website
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="flex gap-2 items-start mb-4">
                  <IoPersonCircleOutline size={32} />
                  <div
                    className="px-4 py-2 rounded-lg text-white max-w-[75%]"
                    style={{ backgroundColor: chatColor }}
                  >
                    {welcomeMessage}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  {suggestedMessages.map((msg, i) => (
                    <button
                      key={i}
                      className="border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100 self-start"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type here and press enter..."
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="p-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
                  >
                    <IoMdSend />
                  </button>
                </div>
              </div>

             
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizeChat;
