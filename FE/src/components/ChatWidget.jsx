import { useEffect, useState } from "react";
import socket from "../socket";

export default function ChatWidget({ orgId }) {
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [chatColor, setChatColor] = useState('#4CAF50');
  const [chatIconUrl, setChatIconUrl] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState('Verifying domain...');

  useEffect(() => {

    socket.emit("VERIFY_DOMAIN", {
      orgId,
      hostname: window.location.hostname,
    });

    socket.on("VERIFIED", (data) => {
      setVerified(true);
      setChatColor(data.chatColor);
      setWelcomeMessage(data.welcomeMessage);
      setChatIconUrl(data.chatIconUrl);
    });

    return () => {
      socket.disconnect();
    };
  }, [orgId]);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer z-[99999] text-white shadow-lg"
        style={{ backgroundColor: chatColor }}
      >
        {chatIconUrl ? (
          <img
            src={chatIconUrl}
            alt="Chat Icon"
            className="w-6 h-6 object-contain"
          />
        ) : (
          '💬'
        )}
      </div>

      {open && (
        <div className="fixed bottom-24 right-5 w-72 h-[400px] bg-white border border-gray-300 rounded-xl z-[99999] p-4 overflow-y-auto shadow-xl">
          <p className="text-gray-800 text-sm">{welcomeMessage}</p>
        </div>
      )}
    </>
  );
}
