import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();
import cors from "cors";

const server = express();
server.use(bodyParser.json());
server.use(cors({
    origin: '*',
}));

//routes
import agentRoutes from "./routes/agent.routes.js";

//routing
server.use("/api/v1/agent", agentRoutes);

server.get("/", (req, res) => {
  res.send("LangGraph interviewer agent is running 🚀");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
