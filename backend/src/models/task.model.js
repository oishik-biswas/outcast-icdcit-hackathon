import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    numberOfHours: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
