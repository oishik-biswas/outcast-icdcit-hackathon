import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {runPythonScript} from "./pythonExecutor.js";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import taskRoute from "./routes/task.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../scripts")));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/users", authRoutes);
app.use("/messages", messageRoutes);
app.use("/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});

async function processPdf() {
    const pdfPath = "C:/Users/KIIT0001/Documents/23051357_BEtc.pdf";
    const outputPath = "C:/Users/KIIT0001/WebstormProjects/outcast-icdcit-hackathon/backend/scripts";

    try {
        console.log("Starting Python script...");
        const result = await runPythonScript(pdfPath, outputPath);
        console.log("Python script output:");
        console.log(result);
    } catch (error) {
        console.error("Error running Python script:", error);
    }
}

// processPdf();
