import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Services } from "./Services.js";

export const Record = sequelize.define('Records', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  ticket: DataTypes.INTEGER,
  action: DataTypes.STRING(100),
  date: DataTypes.DATE,
  time: DataTypes.TIME
}, {
  timestamps: false,
  tableName: 'record'
});

