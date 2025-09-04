import * as Booking from "../models/booking.model.js";
import { sendSuccess, sendError } from "../utils/response.js";

// Create a new booking
export const create = async (req, res) => {
  try {
    const id = await Booking.createBooking(req.body);
    return sendSuccess(res, "Booking created successfully", { id });
  } catch (err) {
    return sendError(res, "Failed to create booking", err);
  }
};

// Get all bookings
export const getAll = async (_req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    return sendSuccess(res, "Bookings retrieved successfully", bookings);
  } catch (err) {
    return sendError(res, "Failed to retrieve bookings", err);
  }
};

// Get booking by ID
export const getById = async (req, res) => {
  try {
    const booking = await Booking.getBookingById(req.params.id);
    if (!booking) return sendError(res, "Booking not found", null, 404);
    return sendSuccess(res, "Booking retrieved successfully", booking);
  } catch (err) {
    return sendError(res, "Failed to retrieve booking", err);
  }
};

// Update booking
export const update = async (req, res) => {
  try {
    const booking = await Booking.getBookingById(req.params.id);
    if (!booking) return sendError(res, "Booking not found", null, 404);
    const response = await Booking.updateBooking(req.params.id, req.body);
    return sendSuccess(res, "Booking updated successfully");
  } catch (err) {
    return sendError(res, "Failed to update booking", err);
  }
};

// Delete booking
export const remove = async (req, res) => {
  try {
    await Booking.deleteBooking(req.params.id);
    return sendSuccess(res, "Booking deleted successfully");
  } catch (err) {
    return sendError(res, "Failed to delete booking", err);
  }
};
