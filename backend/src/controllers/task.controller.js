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
    const { id } = req.params;
    const { status } = req.body;

    const task = await taskModel.findByIdAndUpdate(id, { status }, { new: true });
    res.json(task);
};
