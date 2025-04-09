const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http"); // <-- import http
const authRoutes = require("./routes/authRoutes");
const orgRoutes = require("./routes/organization");
const { connectDB } = require("./config/db");
const setupSocketIO = require("./socketServer")
const uploadRoute = require("./routes/uploadRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/upload", uploadRoute);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  // Initialize WebSocket server
  setupSocketIO(server); 

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
