import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import {runPythonScript} from "./pythonExecutor.js";
import {spawn} from "child_process";

import path from "path";

import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import taskRoute from "./routes/task.route.js";
import {app, server} from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

const upload = multer({dest: "uploads/"});

app.post("/upload", upload.single("file"), (req, res) => {
    const pdfPath = req.file.path;
    const outputDir = path.join(__dirname, "outputs");
    const outputPath = path.join(outputDir, `${req.file.filename}_summary.txt`);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const pythonProcess = spawn("python3", ["process_pdf.py", pdfPath, outputPath]);

    pythonProcess.stdout.on("data", (data) => {
        console.log(`Python stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);

        if (code === 0) {
            res.json({message: "PDF processed successfully", outputPath});
        } else {
            res.status(500).json({message: "Failed to process PDF"});
        }

        fs.unlinkSync(pdfPath);
    });
});

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});

async function processPdf() {
    const pdfPath = "C:/Users/KIIT0001/Desktop/Semester 1/Physics/Diffraction.pdf";
    const outputPath = "C:/Users/KIIT0001/Documents/GitHub/outcast-icdcit-hackathon/backend/src/output.txt";

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
