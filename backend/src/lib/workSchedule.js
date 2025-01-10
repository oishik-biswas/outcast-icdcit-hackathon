import dotenv from "dotenv";
import Task from "../models/task.model.js";
import axios from "axios";

dotenv.config();


// Load environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MONGO_URI =
    "mongodb+srv://biswasoishik5:lSL48O6YeMb5edxe@cluster0.3ctle.mongodb.net/outcast?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "outcast";
const TASKS_COLLECTION = "tasks";

/**
 * Fetch tasks from MongoDB for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - Array of tasks.
 */
async function fetchTasks(userId) {
    try {
        const tasks = await Task.find({userId: userId});
        console.log("Fetched tasks:", tasks);
        return tasks;
    } catch (error) {
        console.error(`Error fetching tasks: ${error.message}`);
        return [];
    }
}

/**
 * Query the GROQ API to generate a schedule.
 * @param {Array} tasks - Array of tasks.
 * @returns {Promise<string|null>} - Schedule as a string, or null if failed.
 */
async function generateSchedule(tasks) {
    const prompt = `
    Create a weekly schedule for these tasks and hours:
    ${JSON.stringify(tasks, null, 2)}

    Requirements:
    1. Distribute tasks across 7 working days (Monday-Sunday)
    2. Each day should have 8-9 working hours
    3. Start time: 9:00 AM
    4. Include 1-hour lunch break at 1:00 PM
    5. Format output as text timetable
    6. Prioritize tasks with higher workload or hours

    Output format example:
    MONDAY
    9:00 AM - 10:30 AM: Task 1
    10:30 AM - 12:00 PM: Task 2
    1:00 PM - 2:00 PM: Lunch Break
    [...]
  `;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                messages: [
                    {
                        role: "system",
                        content: "You are a scheduling assistant that creates text-based timetables.",
                    },
                    { role: "user", content: prompt },
                ],
                model: "llama-3.3-70b-versatile",
                max_tokens: 1000,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            return response.data.choices[0].message.content;
        } else {
            console.error(`API Error: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error(`Error querying GROQ API: ${error.message}`);
        return null;
    }
}
const inputString = `To create a weekly schedule based on the provided tasks, we first need to filter out tasks with 0 hours, as they do not contribute to the workload. Then, we sort the tasks by their \`numberOfHours\` in descending order to prioritize tasks with higher workloads.

Given tasks:
\`\`\`json
[
  {
    "numberOfHours": 100,
    "name": "rest"
  },
  {
    "numberOfHours": 50,
    "name": "operation"
  },
  {
    "numberOfHours": 50,
    "name": "operation"
  },
  {
    "numberOfHours": 50,
    "name": "checkup"
  },
  {
    "numberOfHours": 35,
    "name": "operation"
  },
  {
    "numberOfHours": 35,
    "name": "operation"
  },
  {
    "numberOfHours": 35,
    "name": "operation"
  },
  {
    "numberOfHours": 34,
    "name": "operation"
  },
  {
    "numberOfHours": 34,
    "name": "operation"
  },
  {
    "numberOfHours": 34,
    "name": "operation"
  },
  {
    "numberOfHours": 34,
    "name": "operation"
  },
  {
    "numberOfHours": 30,
    "name": "operation"
  },
  {
    "numberOfHours": 23,
    "name": "operation"
  }
]
\`\`\`

## Weekly Schedule

#### MONDAY
- 9:00 AM - 1:00 PM: operation (50 hours) - Allocate 4 hours
- 1:00 PM - 2:00 PM: Lunch Break
- 2:00 PM - 5:00 PM: operation (50 hours) - Allocate 3 hours
- Remaining hours for operation (50 hours): 50 - 7 = 43 hours

#### TUESDAY
- 9:00 AM - 1:00 PM: operation (50 hours) - Allocate 4 hours (continuing from Monday)
- 1:00 PM - 2:00 PM: Lunch Break
- 2:00 PM - 5:00 PM: operation (50 hours) - Allocate 3 hours
- Remaining hours for operation (50 hours): 43 - 7 = 36 hours

#### WEDNESDAY
- 9:00 AM - 1:00 PM: operation (50 hours) - Allocate 4 hours (continuing from Tuesday)
- 1:00 PM - 2:00 PM: Lunch Break
- 2:00 PM - 5:00 PM: operation (50 hours) - Allocate 3 hours
- Remaining hours for operation (50 hours): 36 - 7 = 29 hours
- Since operation (50 hours) is completed, start checkup (50 hours)
- 5:00 PM - 6:00 PM: checkup (50 hours) - Allocate 1 hour

#### THURSDAY
- 9:00 AM - 1:00 PM: checkup (50 hours) - Allocate 4 hours
- 1:00 PM - 2:00 PM: Lunch Break
- 2:00 PM - 5:00 PM: checkup (50 hours) - Allocate 3 hours
- Remaining hours for checkup (50 hours): 50 - 8 = 42 hours

#### FRIDAY
- 9:00 AM - 1:00 PM: checkup (50 hours) - Allocate 4 hours (continuing from Thursday)
-`;

function extractSchedule(input) {
    const schedule = {};
    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

    days.forEach((day) => {
        const dayStart = input.indexOf(`#### ${day}`);
        if (dayStart !== -1) {
            const dayEnd = input.indexOf("####", dayStart + 1);
            const daySchedule = input
                .slice(dayStart, dayEnd === -1 ? undefined : dayEnd)
                .split("\n")
                .filter((line) => line.startsWith("-"))
                .map((line) => line.replace(/^- /, "").trim());
            schedule[day] = daySchedule;
        }
    });

    return schedule;
}


/**
 * Main function to fetch tasks, call the API, and return the schedule.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<string|null>} - The generated schedule or null if failed.
 */
export const createSchedule = async (userId) => {
    console.log(`Fetching tasks for userId: ${userId}`);
    const tasks = await fetchTasks(userId);

    if (!tasks.length) {
        console.error("No tasks found for the user.");
        return null;
    }

    console.log("Generating schedule...");
    const schedule = await generateSchedule(tasks);

    if (schedule || true) {
        console.log("Schedule generated successfully.");
        return extractSchedule(inputString);
    } else {
        console.error("Failed to generate schedule.");
        return null;
    }
}

// Example usage
(async () => {
    const userId = "677fadf814adaac78d0cd56d";
    const schedule = await createSchedule(userId);
    const schedule_json = await extractSchedule(inputString);
    // const schedule = generateWeeklySchedule(fetchTasks(userId));

    if (schedule) {
        console.log("Generated Schedule:");
        console.log(schedule_json);
    }
})();
