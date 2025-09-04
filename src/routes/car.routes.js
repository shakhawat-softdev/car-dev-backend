import express from "express";
import * as CarController from "../controllers/car.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.post("/", upload.single("img"), CarController.create);
router.post("/", CarController.create);
router.get("/", CarController.getAll);
router.get("/:id", CarController.getById);
router.put("/:id", CarController.update);
router.delete("/:id", CarController.remove);

export default router;


