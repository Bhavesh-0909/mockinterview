import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
config();
import cors from "cors";

const server = express();
server.use(bodyParser.json());
server.use(cookieParser());

server.use(cors({
    origin: '*',
}));

//routes
import agentRoutes from "./routes/agent.routes.js";
import authRoutes from "./routes/auth.routes.js";

//routing
server.use("/api/v1/agent", agentRoutes);
server.use("/api/v1/auth", authRoutes);

server.get("/", (req, res) => {
  res.send("LangGraph interviewer agent is running 🚀");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// otp cleanup
import { startOtpCleanup } from "./services/otpCleaner.js";
startOtpCleanup();