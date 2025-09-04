import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";
import Booking from "./booking.model.js";

const Car = sequelize.define(
  "Car",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    model: DataTypes.STRING,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    img: DataTypes.STRING,
    year: DataTypes.INTEGER,
    seats: DataTypes.INTEGER,
    rent_per_month: DataTypes.FLOAT,
    rent_per_day: DataTypes.FLOAT,
    fuel_per_km: DataTypes.FLOAT,
    lunch_cost: DataTypes.FLOAT,
    dinner_cost: DataTypes.FLOAT,
    overtime_per_hour: DataTypes.FLOAT,
    tour_allowance_per_night: DataTypes.FLOAT,
  },
  {
    tableName: "car_details",
    timestamps: false,
  }
);

export default Car;

//create table in databse
const create_car_details_Model = async () => {
  try {
    await Car.sync({ force: true }); // This will recreate the table
    console.log("Car table created successfully!");
  } catch (error) {
    console.error("Error creating Car table:", error);
  }
};

// create_car_details_Model();

// Create a new item
export const createCar = async (item) => {
  const newCar = await Car.create(item);
  return newCar.id;
};

// Get all items
export const getAllCars = async () => {
  const cars = await Car.findAll();
  return cars;
};

// Get a item by ID
export const getCarById = async (id) => {
  const car = await Car.findByPk(id);
  return car;
};

// Update a item
export const updateCar = async (id, item) => {
  const [updated] = await Car.update(item, { where: { id } });
  return updated;
};

// Delete a item
// export const deleteCar = async (id) => {
//   await Car.destroy({ where: { id } });
// };
export const deleteCar = async (id) => {
  const bookings = await Booking.findAll({ where: { car_id: id } });

  if (bookings.length > 0) {
    const error = new Error("This car is used in one or more bookings.");
    error.name = "CarInUseError";
    throw error;
  }

  await Car.destroy({ where: { id } });
};