const { Server } = require("socket.io");
const { Organization, CustomizationSettings } = require("./models");

function setupSocketIO(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // adjust for production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected");
  
    // ✅ Join a room based on org ID
    socket.on("JOIN_ORG_ROOM", ({ orgId }) => {
      const roomName = `org_${orgId}`;
      socket.join(roomName);
      console.log(`🟢 Socket joined room: ${roomName}`);
    });
  
    socket.on("VERIFY_DOMAIN", async ({ orgId, hostname }) => {
      try {
        const org = await Organization.findByPk(orgId, {
          include: CustomizationSettings,
        });
  
        if (!org) return;
  
        const normalizeHostname = (value) => {
          try {
            return new URL(value).hostname.replace(/^www\./, "");
          } catch {
            return value.replace(/^www\./, "");
          }
        };
  
        const clientDomain = hostname.replace(/^www\./, "");
        const registeredDomain = normalizeHostname(org.domain);
  
        const domainsMatch =
          clientDomain === registeredDomain ||
          (clientDomain === "localhost" && registeredDomain === "127.0.0.1") ||
          (clientDomain === "127.0.0.1" && registeredDomain === "localhost");
  
        if (domainsMatch) {
          org.Verified = true;
          await org.save();
  
          const roomName = `org_${org.id}`;
          const eventName = `ORG_VERIFIED_${org.id}`;
  
          io.to(roomName).emit(eventName, {
            orgId: org.id,
            welcomeMessage: org.CustomizationSetting?.welcomeMessage,
            chatColor: org.CustomizationSetting?.chatColor,
            chatIconUrl: org.CustomizationSetting?.chatIconUrl || null,
          });
  
          console.log(`✅ Domain verified. Event emitted to ${roomName}`);
        }
      } catch (err) {
        console.error("Socket error:", err);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected");
    });
  });
  

  console.log("✅ Socket.IO server ready");
  return io;
}

module.exports = setupSocketIO;
