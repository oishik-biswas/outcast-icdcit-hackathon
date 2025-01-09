import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { spawn } from "child_process";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import taskRoute from "./routes/task.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

// Middleware setup
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

// API Routes
app.use("/users", authRoutes);
app.use("/messages", messageRoutes);
app.use("/tasks", taskRoute);

// Production static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Ensure uploads and outputs directories exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads", { recursive: true });
}
if (!fs.existsSync("outputs")) {
  fs.mkdirSync("outputs", { recursive: true });
}

// Multer storage and file filter setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
});

// File upload and processing route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfPath = path.resolve(req.file.path);
    const outputDir = path.resolve(__dirname, "outputs");
    const outputPath = path.join(
      outputDir,
      `${path.basename(req.file.originalname, ".pdf")}_summary.txt`
    );

    const pythonProcess = spawn(
      "python",
      [path.resolve("./scripts/process_pdf.py"), pdfPath, outputPath],
      { shell: true }
    );

    let stderrData = "";

    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      stderrData += data;
      console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on("error", (error) => {
      console.error("Failed to start Python process:", error);
      res.status(500).json({ error: "Failed to process PDF" });
    });

    pythonProcess.on("close", (code) => {
      try {
        if (code === 0) {
          const summary = fs.readFileSync(outputPath, "utf8");
          res.json({ message: "PDF processed successfully", summary });
        } else {
          throw new Error(stderrData || "PDF processing failed");
        }
      } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
      } finally {
        // Cleanup files
        if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
