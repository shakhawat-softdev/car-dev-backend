import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;

// Create table in DB
const create_user_table = async () => {
  try {
    await User.sync({ force: true }); // ⚠️ Recreates table
    console.log("User table created successfully!");
  } catch (error) {
    console.error("Error creating User table:", error);
  }
};

// create_user_table();

// CRUD Methods

export const createUser = async (data) => {
  const user = await User.create(data);
  return user.id;
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getUserById = async (id) => {
  return await User.findByPk(id);
};

export const updateUser = async (id, data) => {
  const [updated] = await User.update(data, { where: { id } });
  return updated;
};

export const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};
