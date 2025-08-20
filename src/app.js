// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import schoolsRouter from "./routes/schools.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ status: true, message: "School API is running" });
});

app.use("/", schoolsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Not found" });
});

// Export the Express app (DO NOT serverless-wrap here)
export default app;

// Only listen locally (not on Vercel)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
