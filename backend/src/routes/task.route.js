import express from "express";
import {getTasks, addTask} from "../controllers/task.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:userId", getTasks);
router.post("/:userId", addTask);

export default router;
