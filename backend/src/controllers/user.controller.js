import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {ApiResponse} from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';
import {taskModel} from '../models/task.model.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const user = await User.create({ username, email, password, role });
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({ user, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        res.json({ user, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProfile = async (req, res) => {
  try {
    const userId = req.user?._id; // optional chaining to avoid undefined errors

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tasks = await taskModel.find({
      $or: [{ createdBy: userId }, { teammate: userId }]
    })
      .populate("createdBy", "username email")
      .populate("teammate", "username email");

    res.status(200).json({ user, tasks });
  } catch (error) {
    console.error("❌ Profile fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Clear refreshToken from DB
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } });

    // Clear cookie if used (adjust name if different)
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





