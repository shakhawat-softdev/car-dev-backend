import * as Car from "../models/car.model.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const create = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file ", req.file);
  try {
    const imgPath = req.file ? `/uploads/${req.file.filename}` : null;
    const id = await Car.createCar({ ...req.body, img: imgPath });
    return sendSuccess(res, "Created successfully", { id });
  } catch (err) {
    return sendError(res, "Failed to create", err);
  }
};

export const getAll = async (_req, res) => {
  try {
    const cars = await Car.getAllCars();
    return sendSuccess(res, "Retrieved successfully", cars);
  } catch (err) {
    return sendError(res, "Failed to retrieve", err);
  }
};

export const getById = async (req, res) => {
  try {
    const car = await Car.getCarById(req.params.id);
    if (!car) return sendError(res, "Car not found", null, 404);
    return sendSuccess(res, "Retrieved successfully", car);
  } catch (err) {
    return sendError(res, "Failed to retrieve", err);
  }
};

export const update = async (req, res) => {
  try {
    const car = await Car.getCarById(req.params.id);
    if (!car) return sendError(res, "Item not found", null, 404);
    await Car.updateCar(req.params.id, req.body);
    return sendSuccess(res, "Updated successfully");
  } catch (err) {
    return sendError(res, "Failed to update", err);
  }
};

// export const remove = async (req, res) => {
//   try {
//     await Car.deleteCar(req.params.id);
//     return sendSuccess(res, "Deleted successfully");
//   } catch (err) {
//     return sendError(res, "Failed to delete", err);
//   }
// };
export const remove = async (req, res) => {
  try {
    await Car.deleteCar(req.params.id);
    return sendSuccess(res, "Deleted successfully");
  } catch (err) {
    // Handle foreign key or car-in-use error
    if (err.name === "CarInUseError") {
      return sendError(res, "Cannot delete car", err.message, 400);
    }

    // Optional: Handle Sequelize FK constraint errors
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return sendError(
        res,
        "Cannot delete car",
        "This car is referenced in bookings",
        400
      );
    }

    return sendError(res, "Failed to delete", err);
  }
};
