import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
};

export const addTask = async (req, res) => {
    try {
        const { name, completed } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Task name is required" });
        }

        const task = new Task({ name, completed });
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to add task", error: error.message });
    }
};
