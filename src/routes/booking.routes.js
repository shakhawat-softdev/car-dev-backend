import express from "express";
import * as BookingController from "../controllers/booking.controller.js";
import multer from "multer";
const upload = multer(); 
const router = express.Router();

router.post("/", upload.none(), BookingController.create); 
router.get("/", BookingController.getAll);
router.get("/:id", BookingController.getById);
router.put("/:id", upload.none(), BookingController.update);
router.delete("/:id", BookingController.remove);

export default router;
