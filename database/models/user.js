import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";


export const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    patronymic: DataTypes.STRING,
    password: DataTypes.STRING,
    
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);


