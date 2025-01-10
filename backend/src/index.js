import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import {createSchedule} from "./lib/workSchedule.js";
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

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const pdfPath = path.resolve(req.file.path);
        const outputDir = path.resolve(__dirname, "outputs");
        const outputPath = path.join(outputDir, `${path.basename(req.file.originalname, '.pdf')}_summary.txt`);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const pythonProcess = spawn("python", [
            path.resolve("./scripts/process_pdf.py"),
            pdfPath,
            outputPath
        ], { shell: true });

        let stdoutData = '';
        let stderrData = '';

        pythonProcess.stdout.on("data", (data) => {
            stdoutData += data;
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
            console.log(`Python process exited with code ${code}`);

            if (code === 0) {
                fs.readFile(outputPath, "utf8", (err, data) => {
                    if (err) {
                        console.error("Error reading output file:", err);
                        res.status(500).json({ message: "Failed to read summary file" });
                        return;
                    }

                    res.json({ message: "PDF processed successfully", summary: data });
                });
            } else {
                res.status(500).json({
                    error: "Failed to process PDF",
                    stderr: stderrData
                });
            }

            // Cleanup
            if (fs.existsSync(pdfPath)) {
                fs.unlinkSync(pdfPath);
            }
            if(fs.existsSync(outputPath)){
                fs.unlinkSync(outputPath);
            }
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/schedule/:userId", (req, res) => {
    const userId = req.params.userId;

    createSchedule(userId).then((schedule) => {
        if (schedule) {
            res.status(200).json(schedule);
        } else {
            res.status(500).send("Failed to generate schedule.");
        }
    });

    // Run the Python script with the userId as an argument
    // const pythonProcess = spawn("python", [path.resolve("./scripts/workload_scheduler.py"), userId]);
    //
    // let pythonOutput = "";
    //
    // // Capture data output from Python
    // pythonProcess.stdout.on("data", (data) => {
    //     pythonOutput += data.toString();
    // });
    //
    // // Handle Python errors
    // pythonProcess.stderr.on("data", (data) => {
    //     console.error(`Python Error: ${data.toString()}`);
    // });
    //
    // // Send the response when Python script finishes
    // pythonProcess.on("close", (code) => {
    //     if (code === 0) {
    //         try {
    //             const scheduleJson = JSON.parse(pythonOutput);
    //             res.status(200).json(scheduleJson);
    //         } catch (err) {
    //             res.status(500).send("Error parsing Python output.");
    //         }
    //     } else {
    //         res.status(500).send("Failed to generate schedule.");
    //     }
    // });
});

app.get("/:skills/courses", (req, res) => {
    const skills = req.params.skills;

    // Spawn the Python script with the skills argument
    const pythonProcess = spawn("python", [
        path.resolve("./scripts/course_scraper.py"),
        skills,
    ]);

    let pythonOutput = "";

    // Capture the Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
        pythonOutput += data.toString();
    });

    // Handle Python script errors
    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Error: ${data}`);
    });

    // Send the response when the Python script finishes
    pythonProcess.on("close", (code) => {
        if (code === 0) {
            try {
                const courses = JSON.parse(pythonOutput); // Parse the JSON output
                res.status(200).json(courses); // Send the courses as the response
            } catch (err) {
                console.error(`Error parsing Python output: ${err}`);
                res.status(500).send("Error parsing Python output.");
            }
        } else {
            res.status(500).send("Failed to fetch courses.");
        }
    });
});

app.get("/questions", (req, res) => {
    const output = [
        {
            "category": "Cardiology",
            "description": "Learn the fundamentals of healthcare systems and management.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary focus of the course described?\n\nA) Understanding cardiac anatomy and physiology\nB) Diagnosing and treating cardiovascular diseases\nC) Learning the fundamentals of healthcare systems and management\nD) Developing surgical skills for cardiac procedures\n\nCorrect answer: C) Learning the fundamentals of healthcare systems and management"
        },
        {
            "category": "Physician",
            "description": "Master essential clinical skills for effective patient care.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary goal of mastering essential clinical skills in a healthcare setting?\n\nA) To enhance medical research and development\nB) To improve hospital administration and management\nC) To provide effective patient care and treatment\nD) To advance medical technology and equipment\n\nCorrect answer: C) To provide effective patient care and treatment"
        },
        {
            "category": "Dietician",
            "description": "Explore the science behind healthy eating and diet planning.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary goal of studying the science behind healthy eating and diet planning?\n\nA) To develop a weight loss program for athletes\nB) To understand the nutritional needs of different populations and plan balanced diets\nC) To create a business plan for a food company\nD) To research the effects of fasting on human health\n\nCorrect answer: B) To understand the nutritional needs of different populations and plan balanced diets"
        },
        {
            "category": "Public Health",
            "description": "Understand global health challenges and solutions.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is a primary goal of global health initiatives?\n\nA) To prioritize the healthcare needs of high-income countries\nB) To develop and implement solutions to address health disparities and challenges worldwide\nC) To focus solely on infectious disease control\nD) To reduce healthcare funding in low-income countries\n\nCorrect answer: B) To develop and implement solutions to address health disparities and challenges worldwide"
        },
        {
            "category": "Health IT",
            "description": "Learn how technology is transforming healthcare delivery.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary focus of the field of Health IT?\n\nA) Developing new medical devices\nB) Transforming healthcare delivery through technology\nC) Improving patient outcomes through pharmaceutical research\nD) Enhancing healthcare administration through policy changes\n\nCorrect answer: B) Transforming healthcare delivery through technology"
        },
        {
            "category": "Psychology",
            "description": "Explore mental health concepts and strategies for well-being.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is a primary focus of studying mental health concepts?\n\nA) Understanding neurological disorders\nB) Developing strategies for physical fitness\nC) Exploring ways to promote emotional well-being\nD) Analyzing cognitive development in children\n\nCorrect answer: C) Exploring ways to promote emotional well-being"
        },
        {
            "category": "Pharmacy",
            "description": "Understand the process of developing pharmaceutical products.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary goal of the pharmaceutical product development process?\n\nA) To conduct clinical trials on existing medications\nB) To discover new chemical entities and formulate them into safe and effective medications\nC) To market and distribute pharmaceutical products to patients\nD) To regulate and monitor pharmaceutical manufacturing processes\n\nCorrect answer: B) To discover new chemical entities and formulate them into safe and effective medications"
        },
        {
            "category": "Physical Therapy",
            "description": "Discover how exercise affects the human body and supports rehabilitation.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary goal of using exercise in the context of physical therapy?\n\nA) To solely improve athletic performance\nB) To support rehabilitation and promote overall health\nC) To only increase muscle mass\nD) To reduce flexibility and mobility\n\nCorrect answer: B) To support rehabilitation and promote overall health"
        },
        {
            "category": "Healthcare Management",
            "description": "Develop leadership skills for managing healthcare teams.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary goal of a course focused on developing leadership skills for managing healthcare teams?\n\nA) To improve patient care outcomes through medical research\nB) To enhance financial management skills in healthcare organizations\nC) To equip healthcare professionals with effective leadership skills for team management\nD) To develop marketing strategies for healthcare services\n\nCorrect answer: C) To equip healthcare professionals with effective leadership skills for team management"
        },
        {
            "category": "Epidemiology",
            "description": "Learn how to investigate and manage health issues in populations.",
            "question": "Here's a multiple-choice question based on the course description:\n\nWhat is the primary focus of the field of Epidemiology?\n\nA) Investigating individual patient cases\nB) Managing healthcare systems and policies\nC) Investigating and managing health issues in populations\nD) Developing new medical treatments and technologies\n\nCorrect answer: C) Investigating and managing health issues in populations"
        }
    ]

    res.json(output);

});


// const upload = multer({dest: "uploads/"});

// app.post("/upload", upload.single("file"), (req, res) => {
//     const pdfPath = req.file.path;
//     const outputDir = path.join(__dirname, "outputs");
//     const outputPath = path.join(outputDir, `${req.file.filename}_summary.txt`);

//     if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir);
//     }

//     // const scriptPath = path.join(__dirname, "../backend/scripts/process_pdf.py");
//     const pythonProcess = spawn("python", ["./scripts/process_pdf.py", pdfPath, outputPath]);

//     pythonProcess.stdout.on("data", (data) => {
//         console.log(`Python stdout: ${data}`);
//     });

//     pythonProcess.stderr.on("data", (data) => {
//         console.error(`Python stderr: ${data}`);
//     });

//     pythonProcess.on("close", (code) => {
//         console.log(`Python process exited with code ${code}`);

//         if (code === 0) {
//             res.json({message: "PDF processed successfully", outputPath});
//         } else {
//             res.status(500).json({message: "Failed to process PDF"});
//         }

//         fs.unlinkSync(pdfPath);
//     });
// });

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});
