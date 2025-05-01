import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";

export const Adress = sequelize.define('Adress', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  street: DataTypes.STRING(100),
  house: DataTypes.INTEGER,
  flat: DataTypes.INTEGER, 
}, {
  timestamps: false,
  tableName: 'adresses'
});
