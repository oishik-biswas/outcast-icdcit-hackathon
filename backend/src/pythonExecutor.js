import {spawn} from "child_process";
import { fileURLToPath } from "url";
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const runPythonScript = (pdfPath, outputPath)  => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, "../scripts/process_pdf.py");
        const pythonProcess = spawn("python", [scriptPath, pdfPath, outputPath]);


        let output = "";
        let errorOutput = "";

        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(`Error: ${errorOutput}`);
            }
        });
    });
}

