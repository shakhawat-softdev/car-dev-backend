// controllers/user.controller.js

import * as User from "../models/user.model.js";
import { sendSuccess, sendError } from "../utils/response.js";

// Create a new user
export const create = async (req, res) => {
  try {
    const id = await User.createUser(req.body);
    return sendSuccess(res, "User created successfully", { id });
  } catch (err) {
    return sendError(res, "Failed to create user", err);
  }
};

// Get all users
export const getAll = async (_req, res) => {
  try {
    const users = await User.getAllUsers();
    return sendSuccess(res, "Users retrieved successfully", users);
  } catch (err) {
    return sendError(res, "Failed to retrieve users", err);
  }
};

// Get user by ID
export const getById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return sendError(res, "User not found", null, 404);
    return sendSuccess(res, "User retrieved successfully", user);
  } catch (err) {
    return sendError(res, "Failed to retrieve user", err);
  }
};

// Update user
export const update = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return sendError(res, "User not found", null, 404);
    await User.updateUser(req.params.id, req.body);
    return sendSuccess(res, "User updated successfully");
  } catch (err) {
    return sendError(res, "Failed to update user", err);
  }
};

// Delete user
export const remove = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    return sendSuccess(res, "User deleted successfully");
  } catch (err) {
    return sendError(res, "Failed to delete user", err);
  }
};
