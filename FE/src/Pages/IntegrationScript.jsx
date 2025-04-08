import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { Loader2, CheckCircle } from "lucide-react";

const IntegrationScript = () => {
  const tokenFromRedux = useSelector((state) => state.auth.token);
  const token = tokenFromRedux || sessionStorage.getItem('token');
  const [scriptCode, setScriptCode] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScript = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/org/get-script`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setScriptCode(response.data.script);
      } catch (err) {
        toast.error("Failed to load script");
      } finally {
        setLoading(false);
      }
    };
    fetchScript();
  }, [token]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Integration Script</h2>
      {loading ? (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <p className="mb-2 text-gray-700">
            Paste this in the <code className="bg-gray-200 px-1 rounded">{"<head>"}</code> of your website:
          </p>
          <pre className="bg-gray-100 p-4 border border-gray-300 rounded text-sm break-all font-mono overflow-x-auto">
            {scriptCode}
          </pre>
          <Button className="mt-6" onClick={() => navigate("/verify-domain")}>
            Next
          </Button>
        </>
      )}
    </div>
  );
};

export default IntegrationScript;
