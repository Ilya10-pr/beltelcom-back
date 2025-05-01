import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Agreement } from "./agreement.js";


export const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    surname: {
      type: DataTypes.STRING(100),
    },
    patronymic: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    
  },
  {
    tableName: "employee",
    timestamps: false,
  }
);

Employee.hasMany(Agreement, {
  foreignKey: "employeeId",
  as: "agreement",
  onDelete: "CASCADE"
})

Agreement.belongsTo(Employee, {
  foreignKey:"employeeId",
  as: "employee"
})

