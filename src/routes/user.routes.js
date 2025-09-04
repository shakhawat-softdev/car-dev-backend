// routes/user.routes.js

import express from "express";
import * as UserController from "../controllers/user.controller.js";
import multer from "multer";

const upload = multer();
const router = express.Router();

// Create a new user
router.post("/", upload.none(), UserController.create);

// Get all users
router.get("/", UserController.getAll);

// Get a single user by ID
router.get("/:id", UserController.getById);

// Update user by ID
router.put("/:id", upload.none(), UserController.update);

// Delete user by ID
router.delete("/:id", UserController.remove);

export default router;
