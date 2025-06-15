import { taskModel } from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, teammate } = req.body;

        const task = await taskModel.create({
            title,
            description,
            createdBy: req.user._id,
            admin: req.user._id,
            teammate
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    const tasks = await taskModel.find().populate("createdBy").populate("teammate");
    res.json(tasks);
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["todo", "in-progress", "done"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const userId = req.user._id.toString();

    const isAuthorized =
      task.createdBy.toString() === userId || task.teammate.some(memberId => memberId.toString() === userId);

    if (!isAuthorized) {
      return res.status(403).json({ error: "You are not authorized to update this task" });
    }

    task.status = status;
    await task.save();

    const populatedTask = await task
    .populate("createdBy", "username email")
    .populate("teammate", "username email");

    res.status(200).json(populatedTask);
  } catch (message) {
    console.error("❌ Update Task Status Error:", message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};