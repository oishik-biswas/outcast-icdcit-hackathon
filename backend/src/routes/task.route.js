import express from "express";
import {getTasks, addTask} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/:userId", getTasks);
router.post("/:userId", addTask);

export default router;
