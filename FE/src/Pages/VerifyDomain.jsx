import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";
import socket from "../socket";

const VerifyDomain = () => {
  const tokenFromRedux = useSelector((state) => state.auth.token);
  const token = tokenFromRedux || sessionStorage.getItem('token');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyDomain = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/org/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const { id, Verified } = response.data;
        const eventName = `ORG_VERIFIED_${id}`;
  
        // ✅ Wait for socket to be connected
        if (!socket.connected) {
          socket.connect();
          socket.once("connect", () => {
            socket.emit("JOIN_ORG_ROOM", { orgId: id });
          });
        } else {
          socket.emit("JOIN_ORG_ROOM", { orgId: id });
        }
  
        socket.on(eventName, (data) => {
          console.log("Socket received verification event");
          setIsVerified(true);
          setLoading(false);
        });
  
        if (Verified) {
          setIsVerified(true);
          setLoading(false);
        }
  
      } catch (err) {
        console.error("Verification error", err);
      } finally {
        setLoading(false);
      }
    };
  
    verifyDomain();
  
    return () => {
      socket.disconnect();
    };
  }, []);
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      {loading && (
        <>
          <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
          <p>Checking verification status...</p>
        </>
      )}
      {!loading && !isVerified && (
        <>
          <Loader2 className="animate-spin text-yellow-500 w-12 h-12" />
          <p>Waiting for domain to be verified...</p>
        </>
      )}
      {!loading && isVerified && (
        <>
          <CheckCircle2 className="text-green-500 w-12 h-12" />
          <p className="text-lg font-semibold">Your domain is verified ✅</p>
          <button
            onClick={() => navigate("/invite-agents")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyDomain;
