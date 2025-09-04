import db from "../config/db.js";

export const ensureCarDetailsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS car_details (
      id INT AUTO_INCREMENT PRIMARY KEY,
      model VARCHAR(100),
      brand VARCHAR(100),
      img VARCHAR(255),
      year INT,
      seats INT,
      rent_per_month DECIMAL(12, 2),
      rent_per_day DECIMAL(12, 2),
      fuel_per_km DECIMAL(10, 2),
      lunch_cost DECIMAL(10, 2),
      dinner_cost DECIMAL(10, 2),
      overtime_per_hour DECIMAL(10, 2),
      tour_allowance_per_night DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
