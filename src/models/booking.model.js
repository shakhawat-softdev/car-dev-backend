import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "car_details",
        key: "id",
      },
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    travel_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    return_date: {
      type: DataTypes.DATEONLY,
    },
    pickup_time: {
      type: DataTypes.TIME,
    },
    total_cost: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
  }
);

export default Booking;

// Create table in DB
const create_booking_table = async () => {
  try {
    await Booking.sync({ force: true }); 
    console.log("Booking table created successfully!");
  } catch (error) {
    console.error("Error creating Booking table:", error);
  }
};

// create_booking_table();

// CRUD methods

export const createBooking = async (data) => {
  console.log("Model Bookind data", data);
  const booking = await Booking.create(data);
  return booking.id;
};

export const getAllBookings = async () => {
  return await Booking.findAll();
};

export const getBookingById = async (id) => {
  return await Booking.findByPk(id);
};

export const updateBooking = async (id, data) => {
  const [updated] = await Booking.update(data, { where: { id } });
  return updated;
};

export const deleteBooking = async (id) => {
  await Booking.destroy({ where: { id } });
};
